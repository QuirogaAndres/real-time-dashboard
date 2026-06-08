import { useState } from 'react'
import CryptoRow from './CryptoRow'
import { formatTime } from '../../utils/formatters'

/* ── Skeleton de una fila mientras carga ─────────────────── */
const Pill = ({ w, h = 10, round = 4, ml }) => (
  <div style={{
    width: w, height: h, borderRadius: round,
    background: '#0f2237',
    ...(ml !== undefined ? { marginLeft: ml } : {}),
    animation: 'pulse 1.5s ease-in-out infinite',
  }} />
)

function SkeletonRow({ index }) {
  return (
    <tr style={{ borderBottom: '1px solid #0a1e35', opacity: 0, animation: `fadeIn .4s ease ${index * 60}ms forwards` }}>
      <td style={{ padding: '14px 14px' }}><Pill w={12} /></td>
      <td style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Pill w={32} h={32} round={16} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Pill w={80} />
            <Pill w={40} h={8} />
          </div>
        </div>
      </td>
      <td style={{ padding: '14px 16px' }}><div style={{ display: 'flex', justifyContent: 'flex-end' }}><Pill w={80} /></div></td>
      <td style={{ padding: '14px 16px' }}><div style={{ display: 'flex', justifyContent: 'flex-end' }}><Pill w={64} h={24} round={6} /></div></td>
      <td style={{ padding: '14px 16px' }}><div style={{ display: 'flex', justifyContent: 'flex-end' }}><Pill w={72} /></div></td>
      <td style={{ padding: '14px 16px' }}><Pill w={120} h={40} /></td>
    </tr>
  )
}

/* ── Tabla principal ─────────────────────────────────────── */
const COLS = ['#', 'ASSET', 'PRICE', '24H', 'MKT CAP', '7D CHART']

/**
 * CryptoTable — tabla completa de criptomonedas.
 *
 * Uso en App.jsx:
 *   const crypto = useCrypto(10)
 *   <CryptoTable {...crypto} />
 *
 * Props (todas vienen del hook useCrypto):
 *   coins        {Array}   - Array de monedas de CoinGecko
 *   loading      {boolean} - true mientras carga
 *   error        {string}  - mensaje de error o null
 *   lastUpdated  {Date}    - fecha/hora del último fetch exitoso
 *   refetch      {Function}- para el botón de refresh manual
 */
export default function CryptoTable({ coins = [], loading, error, lastUpdated, refetch }) {
  const [busy, setBusy] = useState(false)

  const onRefresh = async () => {
    setBusy(true)
    await refetch()
    setTimeout(() => setBusy(false), 700)
  }

  return (
    <>
      {/* Keyframes — solo se necesita agregar esto una vez en tu index.css o main.css */}
      <style>{`
        @keyframes spin    { to   { transform: rotate(360deg); } }
        @keyframes fadeIn  { to   { opacity: 1; } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse   { 0%,100% { opacity: .35; } 50% { opacity: .7; } }
      `}</style>

      <div style={{ background: '#050d1a', borderRadius: 16, overflow: 'hidden', border: '1px solid #0f2035', boxShadow: '0 0 0 1px rgba(16,185,129,.04), 0 32px 64px rgba(0,0,0,.6)' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #0f2035', background: '#040a14' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <div>
              <h2 style={{ margin: 0, color: '#e2e8f0', fontSize: 15, fontWeight: 600, letterSpacing: '-.01em' }}>
                Mercado Cripto
              </h2>
              <p style={{ margin: '2px 0 0', color: '#1e3a5f', fontSize: 10, fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '.04em' }}>
                {loading && !lastUpdated ? 'CONECTANDO...' : lastUpdated ? `LIVE · ${formatTime(lastUpdated)}` : ''}
              </p>
            </div>
          </div>

          <button
            onClick={onRefresh}
            disabled={loading || busy}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.18)',
              borderRadius: 8, padding: '6px 14px',
              color: '#10b981', fontSize: 11, cursor: 'pointer',
              fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '.06em',
              opacity: (loading || busy) ? 0.4 : 1, transition: 'opacity .2s',
            }}
          >
            <span style={{ display: 'inline-block', animation: busy ? 'spin .7s linear infinite' : 'none' }}>↻</span>
            REFRESH
          </button>
        </div>

        {/* ── Error ── */}
        {error && (
          <div style={{ margin: '12px 16px', padding: '10px 14px', background: 'rgba(239,68,68,.06)', border: '1px solid rgba(239,68,68,.2)', borderRadius: 8, color: '#fca5a5', fontSize: 11, fontFamily: 'IBM Plex Mono, monospace' }}>
            ERROR › {error}
          </div>
        )}

        {/* ── Tabla ── */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#040a14', borderBottom: '1px solid #0f2035' }}>
                {COLS.map((h, i) => (
                  <th key={h} style={{
                    padding: '9px 16px',
                    color: '#1e3a5f', fontSize: 10, fontWeight: 600,
                    letterSpacing: '.08em', fontFamily: 'IBM Plex Mono, monospace',
                    textAlign: i <= 1 ? 'left' : i === 5 ? 'left' : 'right',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 10 }, (_, i) => <SkeletonRow key={i} index={i} />)
                : coins.map((coin, i) => (
                    <CryptoRow
                      key={coin.id}
                      coin={coin}
                      rank={i + 1}
                      animDelay={i * 45}
                    />
                  ))}
            </tbody>
          </table>
        </div>

        {/* ── Footer ── */}
        {!loading && coins.length > 0 && (
          <div style={{ padding: '9px 20px', borderTop: '1px solid #0f2035', display: 'flex', justifyContent: 'space-between', background: '#040a14' }}>
            <span style={{ color: '#1e3a5f', fontSize: 10, fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '.04em' }}>
              DATA: COINGECKO · REFRESH: 60S
            </span>
            <span style={{ color: '#1e3a5f', fontSize: 10, fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '.04em' }}>
              TOP {coins.length} BY MKT CAP
            </span>
          </div>
        )}
      </div>
    </>
  )
}
