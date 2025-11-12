import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import useFilms from '../hooks/useFilms.js'

export default function FilmDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { films } = useFilms()
  const [film, setFilm] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const filmFromMemory = useMemo(() => films.find(f => f.id === id), [films, id])

  useEffect(() => {
    if (filmFromMemory) {
      setFilm(filmFromMemory)
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json()
      })
      .then((raw) => {
        const normalized = {
          id: raw.id,
          name: raw.title ?? 'Untitled',
          image: raw.image ?? raw.movie_banner ?? '',
          description: raw.description ?? 'Sin descripción'
        }
        setFilm(normalized)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [filmFromMemory, id])

  if (loading)
    return (
      <p className="text-center text-gray-600 text-lg animate-pulse">
        Cargando detalle…
      </p>
    )

  if (error) {
    return (
      <section className="p-6 text-center">
        <p className="text-red-600 font-semibold mb-3">
          Error al cargar: {error.message}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Volver
        </button>
      </section>
    )
  }

  if (!film) {
    return (
      <section className="p-6 text-center">
        <p className="text-gray-700 mb-4">
          No se encontró la película solicitada.
        </p>
        <Link
          to="/characters"
          className="text-blue-600 hover:underline font-medium"
        >
          Volver al listado
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm transition-colors"
        >
          Volver
        </button>
        <Link
          to="/characters"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Ir al listado
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">{film.name}</h2>

      {film.image && (
        <img
          src={film.image}
          alt={film.name}
          className="w-full h-auto rounded-lg mb-4 shadow-sm"
        />
      )}

      <p className="text-gray-700 leading-relaxed">{film.description}</p>
    </section>
  )
}
