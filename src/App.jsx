import { useCrypto }   from './hooks/useCrypto'
import { useWeather }  from './hooks/useWeather'
import { useNews }     from './hooks/useNews'
import CryptoTable     from './components/Crypto/CryptoTable'
import WeatherWidget   from './components/Weather/WeatherWidget'
import NewsFeed        from './components/News/NewsFeed'

export default function App() {
  const crypto  = useCrypto(10)
  const weather = useWeather('La Paz,BO')
  const news    = useNews('technology')

  return (
    <main style={{
      background: '#020b16',
      minHeight : '100vh',
      padding   : '1.5rem',
      backgroundImage: 'linear-gradient(rgba(16,185,129,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,.018) 1px,transparent 1px)',
      backgroundSize : '48px 48px',
      fontFamily: "'Outfit', system-ui, sans-serif",
    }}>

      {/* Header */}
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, color: '#e2e8f0', fontSize: 22, fontWeight: 600, letterSpacing: '-.01em' }}>
          Dashboard
        </h1>
        <p style={{ margin: '4px 0 0', color: '#334155', fontSize: 13, fontFamily: 'IBM Plex Mono, monospace' }}>
          Cripto · Clima · Noticias — datos en tiempo real
        </p>
      </header>

      {/* Fila superior: cripto (izq, ancho) + clima (der, fijo) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start', marginBottom: '1.5rem' }}>
        <CryptoTable  {...crypto}  />
        <WeatherWidget {...weather} />
      </div>

      {/* Fila inferior: noticias full width */}
      <NewsFeed {...news} />

    </main>
  )
}
