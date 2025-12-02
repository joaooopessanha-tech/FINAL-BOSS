import { useState, useEffect, useCallback } from 'react'
import { fetchCardsByMonth, fetchCardsByRarity, fetchCardsByColor, fetchFallbackCards } from '@/lib/api'

export const useCards = (options = {}) => {
  const {
    year = new Date().getFullYear(),
    month = new Date().getMonth() + 1,
    category = 'all',
    enabled = true,
  } = options

  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCards = useCallback(async () => {
    if (!enabled) return

    setIsLoading(true)
    setError(null)

    try {
      let fetchedCards = []

      if (category === 'all') {
        fetchedCards = await fetchCardsByMonth(year, month)
      } else if (category.startsWith('rarity-')) {
        const rarityValue = category.replace('rarity-', '')
        fetchedCards = await fetchCardsByRarity(rarityValue)
      } else if (category.startsWith('color-')) {
        const colorMap = {
          white: 'W',
          blue: 'U',
          black: 'B',
          red: 'R',
          green: 'G',
        }
        const colorValue = category.replace('color-', '')
        fetchedCards = await fetchCardsByColor(colorMap[colorValue] || colorValue)
      }

      // Se não retornou cartas, tentar fallback (consulta genérica)
      if ((!fetchedCards || fetchedCards.length === 0)) {
        const fallback = await fetchFallbackCards()
        fetchedCards = fallback
      }

      setCards(fetchedCards)
    } catch (err) {
      setError('Erro ao carregar cartas. Tente novamente.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [year, month, category, enabled])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  return {
    cards,
    isLoading,
    error,
    refetch: fetchCards,
  }
}
