// OpenWeatherMap API — free tier: 1000 llamadas/día
// Registro gratis en: https://openweathermap.org/api
// Guarda tu key en .env como: VITE_OPENWEATHER_KEY=tu_key

const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY

/**
 * Clima actual de una ciudad
 * @param {string} city - ej: 'La Paz,BO' | 'Santa Cruz,BO' | 'Cochabamba,BO'
 */
export const getCurrentWeather = async (city = 'La Paz,BO') => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&lang=es&appid=${API_KEY}`
  )
  if (!response.ok) throw new Error('Ciudad no encontrada. Prueba con "Ciudad,CódigoPaís"')
  return response.json()
}

/**
 * Pronóstico de 5 días (cada 3 horas)
 * cnt=5 devuelve las próximas 5 mediciones (15 horas aprox.)
 */
export const getForecast = async (city = 'La Paz,BO') => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&lang=es&cnt=5&appid=${API_KEY}`
  )
  if (!response.ok) throw new Error('No se pudo obtener el pronóstico')
  return response.json()
}
