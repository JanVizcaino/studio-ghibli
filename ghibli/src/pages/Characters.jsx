import CharacterCard from '../components/CharacterCard.jsx' 
import useFilms from '../hooks/useFilms.js' 

export default function Characters() { 
  // Usamos el hook como si fuera una "caja negra" de datos 
  const { films, loading, error, reload } = useFilms() 

  if (loading) return <p>Cargando películas…</p> 
  if (error)   return ( 
    <section> 
      <p>Error al cargar: {error.message}</p> 
      <button onClick={reload}>Reintentar</button> 
    </section> 
  ) 
  if (films.length === 0) return ( 
    <section> 
      <p>No hay películas para mostrar.</p> 
      <button onClick={reload}>Recargar</button> 
    </section> 
  ) 

  return ( 
    <section> 
      <h2>Películas de Studio Ghibli</h2> 
      <p>Total: {films.length}</p> 
      {/* Botón para recargar manualmente desde la API */} 
      <button onClick={reload}>Recargar desde la API</button> 
      <ul> 
        {films.map((film) => ( 
          <CharacterCard key={film.id} character={film} /> 
        ))} 
      </ul> 
    </section> 
  ) 
} 
