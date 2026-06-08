/**
 * Formatea un precio en USD.
 * - Monedas >= $1 → 2 decimales ($67,420.00)
 * - Monedas baratas (SHIB, PEPE…) → hasta 6 decimales ($0.000021)
 */
export const formatPrice = (p) =>
  p >= 1
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(p)
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4, maximumFractionDigits: 6 }).format(p)

/**
 * Formatea market cap en T / B / M.
 * Ejemplo: 1_327_000_000_000 → "$1.33T"
 */
export const formatCap = (n) =>
  n >= 1e12 ? `$${(n / 1e12).toFixed(2)}T`
  : n >= 1e9  ? `$${(n / 1e9).toFixed(2)}B`
  : n >= 1e6  ? `$${(n / 1e6).toFixed(2)}M`
  : `$${n.toLocaleString()}`

/**
 * Formatea porcentaje de cambio con signo.
 * Ejemplo: 2.34 → "+2.34%"  |  -1.5 → "-1.50%"
 */
export const formatPct = (p) =>
  p == null ? '—' : `${p > 0 ? '+' : ''}${p.toFixed(2)}%`

/**
 * Formatea hora en formato HH:MM:SS (es-BO).
 */
export const formatTime = (d) =>
  d?.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
