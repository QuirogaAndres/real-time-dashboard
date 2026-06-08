// GNews API — alternativa a NewsAPI sin problemas de CORS
// Free tier: 100 req/día — Registro gratis en: https://gnews.io
// Guarda tu key en .env como: VITE_GNEWS_KEY=tu_key

const BASE_URL = 'https://gnews.io/api/v4'
const API_KEY = import.meta.env.VITE_GNEWS_KEY

// Categorías disponibles en GNews
export const CATEGORIES = [
  'technology',
  'business',
  'science',
  'health',
  'sports',
  'world',
]

/**
 * Top headlines por categoría
 * @param {string} category - una de CATEGORIES
 * @param {string} lang     - 'es' | 'en' | 'pt' | etc.
 */
export const getTopHeadlines = async (category = 'technology', lang = 'es') => {
  const response = await fetch(
    `${BASE_URL}/top-headlines?category=${category}&lang=${lang}&country=any&max=9&apikey=${API_KEY}`
  )
  if (!response.ok) throw new Error('Error al obtener noticias')
  return response.json()
  // Respuesta: { totalArticles, articles: [{ title, description, url, image, publishedAt, source }] }
}

/**
 * Búsqueda de noticias por término
 */
export const searchNews = async (query, lang = 'es') => {
  const response = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}&lang=${lang}&max=9&apikey=${API_KEY}`
  )
  if (!response.ok) throw new Error('Error en la búsqueda')
  return response.json()
}
