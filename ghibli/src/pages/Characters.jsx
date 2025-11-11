import { useEffect, useState } from 'react' 
import CharacterCard from '../components/CharacterCard.jsx' 

export default function Characters() { 
  const [films, setFilms] = useState([])    // estado: lista de pelis 
  const [loading, setLoading] = useState(false) // indica si estamos pidiendo a la API 
  const [error, setError] = useState(null)  // para mostrar errores si ocurren 

  const CACHE_KEY = 'ghibli_films' // clave única para guardar en localStorage 

  // Función que pide datos reales a la API y guarda en estado y localStorage 
  function fetchFilmsFromAPI() { 
    setLoading(true) 
    setError(null) 

    fetch('https://ghibliapi.vercel.app/films') 
      .then((response) => { 
        if (!response.ok) { 
          throw new Error('HTTP ' + response.status) 
        } 
        return response.json() 
      }) 
      .then((data) => { 
        // Guardamos en el estado (para mostrar en pantalla) 
        setFilms(data) 
        // También guardamos una copia en localStorage para usarla más tarde 
        localStorage.setItem(CACHE_KEY, JSON.stringify(data)) 
      }) 
      .catch((err) => { 
        setError(err) 
      }) 
      .finally(() => { 
        setLoading(false) 
      }) 
  } 

  // Al montar el componente, comprobamos si hay cache 
  useEffect(() => { 
    const cached = localStorage.getItem(CACHE_KEY) 

    if (cached) { 
      // Si había cache, la usamos parseando el texto JSON 
      const parsedData = JSON.parse(cached) 
      setFilms(parsedData) 
    } else { 
      // Si NO había cache, pedimos a la API 
      fetchFilmsFromAPI() 
    } 
  }, []) // [] → solo al montar 

  // Botón de recarga manual: borra cache y pide a la API de nuevo 
  function handleReloadClick() { 
    localStorage.removeItem(CACHE_KEY) // borramos cache 
    fetchFilmsFromAPI()                // pedimos de nuevo 
  } 

  // Tres posibles estados visuales 
  if (loading) return <p>Cargando películas...</p> 
  if (error)   return <p>Error al cargar: {error.message}</p> 

  return ( 
    <section> 
      <h2>Películas de Studio Ghibli</h2> 
      <p>Total: {films.length}</p> 

      <button onClick={handleReloadClick}> 
        Recargar desde la API 
      </button> 

      <ul> 
        {films.map((film) => ( 
          <CharacterCard key={film.id} character={film} /> 
        ))} 
      </ul> 
    </section> 
  ) 
} 
