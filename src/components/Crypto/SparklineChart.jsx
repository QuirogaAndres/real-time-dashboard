import { AreaChart, Area, ResponsiveContainer } from 'recharts'

/**
 * Mini chart de área para mostrar la variación de precio de los últimos 7 días.
 *
 * @param {number[]} prices  - Array de ~168 precios (viene de sparkline_in_7d.price)
 * @param {boolean}  isUp    - true si el precio subió en 24h (controla el color)
 * @param {string}   coinId  - ID único de la moneda (ej: "bitcoin") para el gradiente SVG
 */
export default function SparklineChart({ prices, isUp, coinId }) {
  if (!prices?.length) return <div style={{ width: 120, height: 40 }} />

  const data   = prices.map(v => ({ v }))
  const stroke = isUp ? '#10b981' : '#ef4444'
  const gradId = `sg_${coinId}` // ID único por moneda para evitar conflictos en el SVG

  return (
    <ResponsiveContainer width={120} height={40}>
      <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 4, left: 0 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={stroke} stopOpacity={0.22} />
            <stop offset="95%" stopColor={stroke} stopOpacity={0}    />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={stroke}
          strokeWidth={1.5}
          fill={`url(#${gradId})`}
          dot={false}
          isAnimationActive={false} // sin animación: evita renders innecesarios en tabla
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
