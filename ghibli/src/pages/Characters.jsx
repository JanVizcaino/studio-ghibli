import { useEffect, useMemo, useState } from 'react'
import CharacterCard from '../components/CharacterCard.jsx'
import useFilms from '../hooks/useFilms.js'

export default function Characters() {
  const { films, loading, error, reload } = useFilms()
  const [search, setSearch] = useState('')

  const SEARCH_KEY = 'ghibli_films_search_v1'

  useEffect(() => {
    const saved = localStorage.getItem(SEARCH_KEY)
    if (saved) setSearch(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem(SEARCH_KEY, search)
  }, [search])

  function handleSearchChange(e) {
    setSearch(e.target.value)
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (term === '') return films
    return films.filter(film => film.name.toLowerCase().includes(term))
  }, [films, search])

  if (loading) return <p className="text-center text-gray-600">Cargando películas…</p>

  if (error) {
    return (
      <section className="max-w-3xl mx-auto p-6">
        <p className="text-red-500 mb-3">Error al cargar: {error.message}</p>
        <button
          onClick={reload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Reintentar
        </button>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Películas de Studio Ghibli</h2>

      {/* Barra de acciones */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Buscar por título…"
          value={search}
          onChange={handleSearchChange}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Buscar películas por título"
        />

        <button
          onClick={reload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Recargar
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-3">
        {search.trim() === ''
          ? `Total: ${films.length} películas`
          : `Coincidencias para "${search.trim()}": ${filtered.length} / ${films.length}`}
      </p>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No hay resultados para la búsqueda actual.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(film => (
            <CharacterCard key={film.id} character={film} />
          ))}
        </ul>
      )}
    </section>
  )
}
