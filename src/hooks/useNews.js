import { useState, useEffect, useCallback } from "react";
import { getTopHeadlines, CATEGORIES } from "../api/gnews";

/**
 * Hook para noticias con cambio de categoría.
 *
 * Uso en componente:
 *   const { articles, loading, error, category, setCategory, categories } = useNews()
 *
 * Para cambiar categoría:
 *   <button onClick={() => setCategory('sports')}>Deportes</button>
 */
export function useNews(initialCategory = "technology") {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTopHeadlines(category);
      setArticles(data.articles ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  // Re-fetch automático al cambiar de categoría
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    articles,
    loading,
    error,
    category,
    setCategory,
    categories: CATEGORIES, // para renderizar los botones de filtro
    refetch: fetchNews,
  };
}
