import { useState } from "react";

/* ── Config de categorías (label + colores) ───────────────────── */
const CATS = {
  technology: {
    label: "Tecnología",
    color: "#3b82f6",
    bg: "rgba(59,130,246,.12)",
    bd: "rgba(59,130,246,.25)",
  },
  business: {
    label: "Negocios",
    color: "#f59e0b",
    bg: "rgba(245,158,11,.12)",
    bd: "rgba(245,158,11,.25)",
  },
  science: {
    label: "Ciencia",
    color: "#10b981",
    bg: "rgba(16,185,129,.12)",
    bd: "rgba(16,185,129,.25)",
  },
  health: {
    label: "Salud",
    color: "#22d3ee",
    bg: "rgba(34,211,238,.1)",
    bd: "rgba(34,211,238,.2)",
  },
  sports: {
    label: "Deportes",
    color: "#ef4444",
    bg: "rgba(239,68,68,.1)",
    bd: "rgba(239,68,68,.2)",
  },
  world: {
    label: "Mundo",
    color: "#a78bfa",
    bg: "rgba(167,139,250,.1)",
    bd: "rgba(167,139,250,.2)",
  },
};

/* ── Tiempo relativo ──────────────────────────────────────────── */
const relTime = (dateStr) => {
  const mins = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (mins < 60) return `Hace ${mins}m`;
  if (mins < 1440) return `Hace ${Math.floor(mins / 60)}h`;
  return `Hace ${Math.floor(mins / 1440)}d`;
};

/* ── SkeletonCard ─────────────────────────────────────────────── */
function SkeletonCard({ i }) {
  const d = `${i * 80}ms`;
  const bar = (w, h = 11) => (
    <div
      style={{
        height: h,
        width: w,
        background: "#0f2237",
        borderRadius: 4,
        animation: `nfPulse 1.5s ease-in-out infinite`,
      }}
    />
  );
  return (
    <div
      style={{
        background: "#050d1a",
        border: "1px solid #0f2035",
        borderRadius: 12,
        overflow: "hidden",
        opacity: 0,
        animation: `nfFade .4s ease ${d} forwards`,
      }}
    >
      <div
        style={{
          height: 160,
          background: "#0f2237",
          animation: "nfPulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {bar(72, 20)}
        {bar("90%")}
        {bar("75%")}
        {bar("55%", 9)}
      </div>
    </div>
  );
}

/* ── NewsCard ─────────────────────────────────────────────────── */
function NewsCard({ article, category, index }) {
  const [hov, setHov] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const cat = CATS[category] ?? CATS.technology;

  return (
    <div
      onClick={() =>
        article.url && window.open(article.url, "_blank", "noopener")
      }
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#050d1a",
        border: `1px solid ${hov ? cat.bd : "#0f2035"}`,
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all .2s ease",
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,.4)" : "none",
        opacity: 0,
        animation: `nfSlide .35s ease ${index * 55}ms forwards`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Imagen */}
      <div
        style={{
          height: 160,
          overflow: "hidden",
          background: "#0f2237",
          flexShrink: 0,
        }}
      >
        {article.image && !imgErr ? (
          <img
            src={article.image}
            alt={article.title}
            onError={() => setImgErr(true)}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hov ? "scale(1.04)" : "scale(1)",
              transition: "transform .3s ease",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: cat.bg,
            }}
          >
            <span style={{ fontSize: 36, opacity: 0.25 }}>📰</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div
        style={{
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          flex: 1,
        }}
      >
        {/* Badge de categoría */}
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".08em",
            fontFamily: "IBM Plex Mono, monospace",
            color: cat.color,
            background: cat.bg,
            border: `1px solid ${cat.bd}`,
            padding: "2px 8px",
            borderRadius: 4,
            width: "fit-content",
          }}
        >
          {cat.label.toUpperCase()}
        </span>

        {/* Título (2 líneas máximo) */}
        <p
          style={{
            margin: 0,
            color: "#e2e8f0",
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.title}
        </p>

        {/* Descripción (2 líneas máximo) */}
        {article.description && (
          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: 12,
              lineHeight: 1.55,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.description}
          </p>
        )}

        {/* Footer: fuente + tiempo + flecha */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: 6,
          }}
        >
          <span
            style={{
              color: "#1e3a5f",
              fontSize: 10,
              fontFamily: "IBM Plex Mono, monospace",
            }}
          >
            {article.source?.name} · {relTime(article.publishedAt)}
          </span>
          <span
            style={{
              color: cat.color,
              fontSize: 14,
              opacity: hov ? 1 : 0,
              transition: "opacity .2s",
            }}
          >
            ↗
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── NewsFeed ─────────────────────────────────────────────────── */
/**
 * Feed de noticias con filtros de categoría.
 *
 * Uso en App.jsx:
 *   const news = useNews('technology')
 *   <NewsFeed {...news} />
 *
 * Props (vienen del hook useNews):
 *   articles    {Array}     - Artículos de GNews
 *   loading     {boolean}
 *   error       {string|null}
 *   category    {string}    - Categoría activa
 *   setCategory {Function}  - Cambia categoría → re-fetch automático
 *   categories  {string[]}  - Lista de categorías disponibles
 */
export default function NewsFeed({
  articles = [],
  loading,
  error,
  category,
  setCategory,
  categories = [],
}) {
  return (
    <>
      <style>{`
        @keyframes nfSlide  { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes nfFade   { to   { opacity:1; } }
        @keyframes nfPulse  { 0%,100%{opacity:.35;} 50%{opacity:.7;} }
      `}</style>

      <div
        style={{
          background: "#050d1a",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid #0f2035",
          boxShadow:
            "0 0 0 1px rgba(167,139,250,.04), 0 32px 64px rgba(0,0,0,.6)",
        }}
      >
        {/* ── Header + filtros ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid #0f2035",
            background: "#040a14",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#a78bfa",
                boxShadow: "0 0 8px #a78bfa",
              }}
            />
            <h2
              style={{
                margin: 0,
                color: "#e2e8f0",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "-.01em",
              }}
            >
              Noticias
            </h2>
          </div>

          {/* Pills de categoría */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {categories.map((cat) => {
              const c = CATS[cat];
              const isActive = cat === category;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    background: isActive ? c?.bg : "transparent",
                    border: `1px solid ${isActive ? c?.bd : "#0f2035"}`,
                    borderRadius: 6,
                    padding: "4px 12px",
                    color: isActive ? c?.color : "#334155",
                    fontSize: 11,
                    cursor: "pointer",
                    fontFamily: "IBM Plex Mono, monospace",
                    letterSpacing: ".06em",
                    transition: "all .18s ease",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {c?.label?.toUpperCase() ?? cat.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Error ── */}
        {error && articles.length === 0 && (
          <div
            style={{
              margin: "12px 16px",
              padding: "10px 14px",
              background: "rgba(239,68,68,.06)",
              border: "1px solid rgba(239,68,68,.2)",
              borderRadius: 8,
              color: "#fca5a5",
              fontSize: 11,
              fontFamily: "IBM Plex Mono, monospace",
            }}
          >
            ERROR › {error}
          </div>
        )}

        {/* ── Grid de cards ── */}
        <div
          style={{
            padding: "1.25rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {loading
            ? Array.from({ length: 6 }, (_, i) => (
                <SkeletonCard key={i} i={i} />
              ))
            : articles.map((article, i) => (
                <NewsCard
                  key={article.url ?? i}
                  article={article}
                  category={category}
                  index={i}
                />
              ))}
        </div>

        {/* ── Footer ── */}
        {!loading && articles.length > 0 && (
          <div
            style={{
              padding: "9px 20px",
              borderTop: "1px solid #0f2035",
              display: "flex",
              justifyContent: "space-between",
              background: "#040a14",
            }}
          >
            <span
              style={{
                color: "#1e3a5f",
                fontSize: 10,
                fontFamily: "IBM Plex Mono, monospace",
                letterSpacing: ".04em",
              }}
            >
              DATA: GNEWS API
            </span>
            <span
              style={{
                color: "#1e3a5f",
                fontSize: 10,
                fontFamily: "IBM Plex Mono, monospace",
                letterSpacing: ".04em",
              }}
            >
              {articles.length} ARTÍCULOS
            </span>
          </div>
        )}
      </div>
    </>
  );
}
