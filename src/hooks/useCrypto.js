import { useState, useEffect, useCallback } from 'react'
import { getTopCoins } from '../api/coingecko'

const REFRESH_MS = 60_000 // auto-refresh cada 60 segundos

/**
 * Hook para obtener las top N criptos con auto-refresh.
 *
 * Uso en componente:
 *   const { coins, loading, error, lastUpdated, refetch } = useCrypto(10)
 */
export function useCrypto(limit = 10) {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchCoins = useCallback(async () => {
    try {
      setError(null)
      const data = await getTopCoins(limit)
      setCoins(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    fetchCoins()
    const interval = setInterval(fetchCoins, REFRESH_MS)
    return () => clearInterval(interval) // cleanup al desmontar
  }, [fetchCoins])

  return { coins, loading, error, lastUpdated, refetch: fetchCoins }
}
