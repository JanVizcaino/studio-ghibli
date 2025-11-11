// src/hooks/useFilms.js
import { useEffect, useState } from 'react'

/**
 * Normaliza una película cruda de la API de Ghibli a un objeto estable para la UI.
 * Si la API cambia nombres, solo hay que ajustar aquí.
 */
function normalizeFilm(raw) {
  return {
    id: raw.id, // ya viene en la API
    name: raw.title ?? 'Untitled', // preferimos trabajar siempre con "name"
    image: raw.image ?? raw.movie_banner ?? '', // fallback si no hay image
    description: raw.description ?? 'Sin descripción'
  }
}

/**
 * Custom hook: useFilms
 * - Carga la lista de películas desde la API de Ghibli.
 * - Cachea el resultado en localStorage con caducidad (TTL).
 * - Devuelve estado de carga, error y función reload para recargar manualmente.
 */
export default function useFilms() {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Configuración de cache
  const CACHE_KEY = 'ghibli_films_v1'
  const CACHE_TTL_MS = 1000 * 60 * 10 // 10 minutos

  function saveCache(items) {
    const payload = {
      savedAt: Date.now(),
      items
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  }

  function loadCache() {
    const text = localStorage.getItem(CACHE_KEY)
    if (!text) return null
    try {
      return JSON.parse(text)
    } catch {
      return null
    }
  }

  function fetchFromAPI() {
    setLoading(true)
    setError(null)
    return fetch('https://ghibliapi.vercel.app/films')
      .then((response) => {
        if (!response.ok) throw new Error('HTTP ' + response.status)
        return response.json()
      })
      .then((data) => {
        const normalized = Array.isArray(data) ? data.map(normalizeFilm) : []
        setFilms(normalized)
        saveCache(normalized)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const cached = loadCache()
    if (cached && Array.isArray(cached.items)) {
      const isFresh = (Date.now() - cached.savedAt) < CACHE_TTL_MS
      if (isFresh) {
        setFilms(cached.items)
        setLoading(false)
        return
      } else {
        localStorage.removeItem(CACHE_KEY)
      }
    }
    fetchFromAPI()
  }, [])

  function reload() {
    localStorage.removeItem(CACHE_KEY)
    return fetchFromAPI()
  }

  return { films, loading, error, reload }
}
