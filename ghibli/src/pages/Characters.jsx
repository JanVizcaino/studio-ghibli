import { useEffect, useState } from 'react' 
import CharacterCard from '../components/CharacterCard.jsx' 

// Página que pide películas a la API de Ghibli con promesas (then/catch) 
export default function Characters() { 
  // Estado: lista de films, bandera de carga y posible error 
  const [films, setFilms] = useState([]) 
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState(null) 

  // Pedimos datos al montar la página 
  useEffect(() => { 
    // 1) Hacemos la petición HTTP 
    fetch('https://ghibliapi.vercel.app/films') 
      // 2) Comprobamos que la respuesta HTTP sea correcta 
      .then((response) => { 
        if (!response.ok) { 
          // Esto lanzará el catch de abajo 
          throw new Error('HTTP ' + response.status) 
        } 
        return response.json() // 3) Convertimos a JS 
      }) 
      // 4) Guardamos en estado la lista de películas 
      .then((data) => { 
        setFilms(data) 
      }) 
      // 5) Si algo falla, guardamos el error (para mostrarlo) 
      .catch((err) => { 
        setError(err) 
      }) 
      // 6) En cualquier caso, dejamos de "cargar" 
      .finally(() => { 
        setLoading(false) 
      }) 
  }, []) // [] => solo se ejecuta una vez al montar 

  // Render: tres posibles estados (loading, error, data) 
  if (loading) return <p>Cargando películas…</p> 
  if (error)   return <p>Error al cargar: {error.message}</p> 
  if (films.length === 0) return <p>No hay películas para mostrar.</p> 

  return ( 
    <section> 
      <h2>Películas de Studio Ghibli</h2> 
      <p>Total: {films.length}</p> 
      <ul> 
        {films.map((film) => ( 
          <CharacterCard key={film.id} character={film} /> 
        ))} 
      </ul> 
    </section> 
  ) 
} 
