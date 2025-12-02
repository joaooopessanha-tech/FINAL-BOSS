import { useState, useEffect, useCallback } from 'react'
import { fetchCardsByName, fetchFallbackCards, fetchPopularCards } from '@/lib/api'

export const useSearchCards = (options = {}) => {
  const { query = '', enabled = true } = options

  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async () => {
    if (!enabled) return
    if (!query || !query.trim()) {
      setCards([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      let results = await fetchCardsByName(query, 50)

      if ((!results || results.length === 0)) {
        results = await fetchFallbackCards()
      }

      setCards(results)
    } catch (err) {
      setError('Erro ao buscar cartas. Tente novamente.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [query, enabled])

  const searchPopular = useCallback(async () => {
    if (!enabled) return

    setIsLoading(true)
    setError(null)

    try {
      const results = await fetchPopularCards(12)
      setCards(results)
    } catch (err) {
      setError('Erro ao buscar cartas populares. Tente novamente.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [enabled])

  useEffect(() => {
    search()
  }, [search])

  return { cards, isLoading, error, refetch: search, loadPopular: searchPopular }
}
