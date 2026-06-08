import { useState } from 'react'
import SparklineChart from './SparklineChart'
import { formatPrice, formatCap, formatPct } from '../../utils/formatters'

/**
 * Fila de la tabla de criptomonedas.
 *
 * Props que recibe directamente del array `coins` de CoinGecko:
 *   coin.id, coin.name, coin.symbol, coin.image,
 *   coin.current_price, coin.market_cap,
 *   coin.price_change_percentage_24h,
 *   coin.sparkline_in_7d.price
 */
export default function CryptoRow({ coin, rank, animDelay = 0 }) {
  const [hovered, setHovered] = useState(false)

  const isUp  = coin.price_change_percentage_24h >= 0
  const color = isUp ? '#10b981' : '#ef4444'

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom : '1px solid #0a1e35',
        borderLeft   : `2px solid ${hovered ? color : 'transparent'}`,
        background   : hovered ? 'rgba(16, 185, 129, 0.04)' : 'transparent',
        transition   : 'all 0.18s ease',
        opacity      : 0,
        animation    : `slideIn 0.35s ease ${animDelay}ms forwards`,
        cursor       : 'default',
      }}
    >
      {/* Rank */}
      <td style={{ padding: '11px 12px 11px 14px', color: '#1e3a5f', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', width: 32 }}>
        {rank}
      </td>

      {/* Nombre + logo */}
      <td style={{ padding: '9px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: '#0f2237', flexShrink: 0 }}>
            <img src={coin.image} alt={coin.name} style={{ width: '100%', height: '100%', display: 'block' }} loading="lazy" />
          </div>
          <div>
            <p style={{ margin: 0, color: '#e2e8f0', fontSize: 13, fontWeight: 500 }}>{coin.name}</p>
            <p style={{ margin: 0, color: '#334155', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', fontFamily: 'IBM Plex Mono, monospace' }}>
              {coin.symbol}
            </p>
          </div>
        </div>
      </td>

      {/* Precio */}
      <td style={{ padding: '11px 16px', textAlign: 'right', color: '#cbd5e1', fontSize: 13, fontFamily: 'IBM Plex Mono, monospace', fontVariantNumeric: 'tabular-nums' }}>
        {formatPrice(coin.current_price)}
      </td>

      {/* % cambio 24h */}
      <td style={{ padding: '11px 16px', textAlign: 'right' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          gap: 3, fontSize: 11, fontWeight: 600,
          fontFamily: 'IBM Plex Mono, monospace',
          color,
          background : isUp ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)',
          border     : `1px solid ${isUp ? 'rgba(16,185,129,0.22)' : 'rgba(239,68,68,0.22)'}`,
          padding    : '3px 8px',
          borderRadius: 6,
          minWidth   : 72,
        }}>
          {isUp ? '▲' : '▼'} {formatPct(coin.price_change_percentage_24h)}
        </span>
      </td>

      {/* Market cap */}
      <td style={{ padding: '11px 16px', textAlign: 'right', color: '#334155', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}>
        {formatCap(coin.market_cap)}
      </td>

      {/* Sparkline 7 días */}
      <td style={{ padding: '6px 16px', width: 140 }}>
        <SparklineChart
          prices={coin.sparkline_in_7d?.price}
          isUp={isUp}
          coinId={coin.id}
        />
      </td>
    </tr>
  )
}
