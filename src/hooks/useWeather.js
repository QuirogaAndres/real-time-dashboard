import { useState, useEffect, useCallback } from 'react'
import { getCurrentWeather, getForecast } from '../api/openweather'

/**
 * Hook para clima actual + pronóstico con buscador de ciudad.
 *
 * Uso en componente:
 *   const { weather, forecast, loading, error, city, setCity } = useWeather()
 *
 * Para cambiar de ciudad:
 *   <input onChange={e => setCity(e.target.value + ',BO')} />
 */
export function useWeather(initialCity = 'La Paz,BO') {
  const [city, setCity] = useState(initialCity)
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Promise.all para llamar ambas endpoints en paralelo (más rápido)
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ])

      setWeather(currentData)
      setForecast(forecastData.list)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [city])

  // Re-fetch automático cada vez que cambia la ciudad
  useEffect(() => {
    fetchWeather()
  }, [fetchWeather])

  return { weather, forecast, loading, error, city, setCity, refetch: fetchWeather }
}
