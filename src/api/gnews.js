// En desarrollo (localhost): llama directo a GNews — funciona sin CORS
// En producción (Vercel):    usa el proxy /api/news      — evita CORS

export const CATEGORIES = ['technology', 'business', 'science', 'health', 'sports', 'world']

export const getTopHeadlines = async (category = 'technology', lang = 'es') => {
  const url = import.meta.env.DEV
    ? `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&country=any&max=9&apikey=${import.meta.env.VITE_GNEWS_KEY}`
    : `/api/news?category=${category}&lang=${lang}`

  const response = await fetch(url)
  if (!response.ok) throw new Error('Error al obtener noticias')
  return response.json()
}

export const searchNews = async (query, lang = 'es') => {
  const url = import.meta.env.DEV
    ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=${lang}&max=9&apikey=${import.meta.env.VITE_GNEWS_KEY}`
    : `/api/news?q=${encodeURIComponent(query)}&lang=${lang}`

  const response = await fetch(url)
  if (!response.ok) throw new Error('Error en la búsqueda')
  return response.json()
}
