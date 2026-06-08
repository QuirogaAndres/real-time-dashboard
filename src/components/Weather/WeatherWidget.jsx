import { useState } from 'react'

/* ── Accent color por condición climática ─────────────────────────
   El widget cambia de personalidad visualmente según el clima.
   Clear → amber  |  Clouds → azul  |  Rain → azul oscuro  |  etc. */
const ACCENT = {
  Clear: '#f59e0b', Clouds: '#60a5fa',
  Rain: '#3b82f6',  Drizzle: '#22d3ee',
  Thunderstorm: '#a78bfa', Snow: '#bae6fd',
  Mist: '#94a3b8',  Fog: '#94a3b8', Haze: '#94a3b8',
}
const getAccent = (cond) => ACCENT[cond] || '#10b981'
const iconUrl   = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`
const round     = (n)    => Math.round(n)
const hour      = (dt)   => dt.split(' ')[1].slice(0, 5)

/* ── ForecastItem ────────────────────────────────────────────────── */
function ForecastItem({ item, isLast }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 2, padding: '8px 4px',
      borderRight: isLast ? 'none' : '1px solid #0f2035',
    }}>
      <span style={{ color: '#1e3a5f', fontSize: 10, fontFamily: 'IBM Plex Mono, monospace' }}>
        {hour(item.dt_txt)}
      </span>
      <img src={iconUrl(item.weather[0].icon)} alt="" style={{ width: 32, height: 32 }} loading="lazy" />
      <span style={{ color: '#cbd5e1', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500 }}>
        {round(item.main.temp)}°
      </span>
    </div>
  )
}

/* ── StatItem ─────────────────────────────────────────────────────── */
function StatItem({ emoji, label, value }) {
  return (
    <div>
      <p style={{ margin: 0, color: '#1e3a5f', fontSize: 10, fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '.06em' }}>
        {emoji} {label}
      </p>
      <p style={{ margin: '3px 0 0', color: '#94a3b8', fontSize: 13, fontFamily: 'IBM Plex Mono, monospace' }}>
        {value}
      </p>
    </div>
  )
}

/* ── WeatherWidget ────────────────────────────────────────────────── */
/**
 * Widget de clima para el dashboard.
 *
 * Uso en App.jsx:
 *   const weather = useWeather('La Paz,BO')
 *   <WeatherWidget {...weather} />
 *
 * Props (vienen del hook useWeather):
 *   weather   {Object}   - Respuesta de OWM /weather
 *   forecast  {Array}    - Próximas 5 mediciones de /forecast
 *   loading   {boolean}
 *   error     {string|null}
 *   setCity   {Function} - Cambia la ciudad → dispara re-fetch automático
 */
export default function WeatherWidget({ weather, forecast, loading, error, setCity }) {
  const [input, setInput] = useState('')

  const handleSearch = () => {
    const q = input.trim()
    if (!q) return
    setCity(q)        // useWeather hace el fetch automáticamente al cambiar city
    setInput('')
  }

  const ac   = getAccent(weather?.weather[0]?.main)
  const cond = weather?.weather[0]

  return (
    <div style={{
      background: '#050d1a', borderRadius: 16, overflow: 'hidden',
      border: '1px solid #0f2035',
      boxShadow: `0 0 0 1px ${ac}0a, 0 24px 48px rgba(0,0,0,.5)`,
      transition: 'box-shadow .5s ease',
      opacity: loading ? 0.7 : 1,
    }}>

      {/* Agrega estos keyframes a tu index.css para no repetirlos */}
      <style>{`@keyframes wPulse { 0%,100%{opacity:.35;} 50%{opacity:.7;} }`}</style>

      {/* ── Buscador ── */}
      <div style={{ display: 'flex', gap: 8, padding: '10px 12px', borderBottom: '1px solid #0f2035', background: '#040a14' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#0a1628', border: '1px solid #0f2035', borderRadius: 8, padding: '0 10px' }}>
          <span style={{ color: '#334155' }}>🔍</span>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar ciudad... (ej: Cochabamba,BO)"
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#e2e8f0', fontSize: 12, padding: '9px 0', fontFamily: 'IBM Plex Mono, monospace' }}
          />
        </div>
        <button
          onClick={handleSearch}
          style={{ background: `${ac}18`, border: `1px solid ${ac}30`, borderRadius: 8, padding: '0 14px', color: ac, fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '.06em', flexShrink: 0 }}
        >
          {loading ? '...' : 'GO'}
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div style={{ margin: '10px 12px', padding: '8px 12px', background: 'rgba(239,68,68,.06)', border: '1px solid rgba(239,68,68,.2)', borderRadius: 8, color: '#fca5a5', fontSize: 11, fontFamily: 'IBM Plex Mono, monospace' }}>
          ERROR › {error}
        </div>
      )}

      {/* ── Skeleton de carga inicial ── */}
      {loading && !weather && (
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[80, 140, 60, 100].map((w, i) => (
            <div key={i} style={{ height: i === 1 ? 52 : 12, width: w, background: '#0f2237', borderRadius: 4, animation: `wPulse 1.5s ease-in-out ${i * 100}ms infinite` }} />
          ))}
        </div>
      )}

      {/* ── Contenido principal ── */}
      {weather && (
        <div style={{ padding: '1.1rem 1.15rem' }}>

          {/* Ciudad + badge de condición */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: 17, fontWeight: 600, letterSpacing: '-.01em' }}>
                {weather.name}, {weather.sys.country}
              </p>
              <p style={{ margin: '3px 0 0', color: '#475569', fontSize: 11, textTransform: 'capitalize', fontFamily: 'IBM Plex Mono, monospace' }}>
                {cond?.description}
              </p>
            </div>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '.1em',
              fontFamily: 'IBM Plex Mono, monospace', color: ac,
              background: `${ac}15`, border: `1px solid ${ac}25`,
              padding: '3px 10px', borderRadius: 6, whiteSpace: 'nowrap',
            }}>
              {cond?.main?.toUpperCase()}
            </span>
          </div>

          {/* Temperatura grande + ícono con glow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <img
              src={iconUrl(cond?.icon || '01d')}
              alt={cond?.description}
              style={{ width: 72, height: 72, filter: `drop-shadow(0 0 14px ${ac}70)` }}
            />
            <div>
              <p style={{ margin: 0, fontSize: 52, fontWeight: 700, color: '#e2e8f0', lineHeight: 1, fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '-.03em' }}>
                {round(weather.main.temp)}°
              </p>
              <p style={{ margin: '5px 0 0', color: '#334155', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}>
                Sensación {round(weather.main.feels_like)}°C
              </p>
            </div>
          </div>

          {/* Grid de estadísticas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', padding: '12px', background: '#040a14', borderRadius: 10, border: '1px solid #0f2035', marginBottom: 14 }}>
            <StatItem emoji="💧" label="HUMEDAD"  value={`${weather.main.humidity}%`} />
            <StatItem emoji="💨" label="VIENTO"   value={`${(weather.wind.speed * 3.6).toFixed(1)} km/h`} />
            <StatItem emoji="🌡️" label="PRESIÓN"  value={`${weather.main.pressure} hPa`} />
            <StatItem emoji="👁️" label="VISIB."   value={`${((weather.visibility ?? 0) / 1000).toFixed(0)} km`} />
          </div>

          {/* Pronóstico (próximas 5 mediciones ~ 15 horas) */}
          {forecast.length > 0 && (
            <div>
              <p style={{ margin: '0 0 6px', color: '#1e3a5f', fontSize: 10, fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '.08em' }}>
                PRONÓSTICO
              </p>
              <div style={{ display: 'flex', border: '1px solid #0f2035', borderRadius: 10, overflow: 'hidden', background: '#040a14' }}>
                {forecast.slice(0, 5).map((item, i) => (
                  <ForecastItem key={i} item={item} isLast={i === 4} />
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
