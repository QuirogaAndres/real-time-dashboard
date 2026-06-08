// CoinGecko API — 100% gratis, sin API key necesaria
// Docs: https://www.coingecko.com/api/documentation

const BASE_URL = 'https://api.coingecko.com/api/v3'

/**
 * Top N criptomonedas por market cap.
 * sparkline: true → incluye datos de precio de los últimos 7 días (para mini charts)
 */
export const getTopCoins = async (limit = 10) => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&sparkline=true`
  )
  if (!response.ok) throw new Error('Error al obtener datos de cripto')
  return response.json()
}

/**
 * Historial de precio de una moneda específica (para charts detallados)
 * @param {string} id  - ej: 'bitcoin', 'ethereum'
 * @param {number} days - días de historial (1, 7, 30, 365)
 */
export const getCoinChart = async (id, days = 7) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  )
  if (!response.ok) throw new Error(`Error al obtener historial de ${id}`)
  return response.json()
}
