// Vercel Serverless Function — proxy para GNews
// Esto va en /api/news.js (raíz del proyecto, NO dentro de src/)
//
// El browser no puede llamar a GNews directamente desde producción (CORS).
// Esta función corre en el servidor de Vercel, hace el fetch a GNews
// y devuelve el resultado al browser sin problemas de CORS.

export default async function handler(req, res) {
  const { category = 'technology', lang = 'es' } = req.query
  const KEY = process.env.VITE_GNEWS_KEY

  if (!KEY) {
    return res.status(500).json({ error: 'VITE_GNEWS_KEY no configurada en Vercel' })
  }

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&country=any&max=9&apikey=${KEY}`
    )
    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener noticias' })
  }
}
