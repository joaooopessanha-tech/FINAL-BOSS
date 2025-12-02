'use client'

import React, { useState, useEffect } from 'react'
import { Search, Star } from 'lucide-react'
import { fetchPopularCards } from '@/lib/api'

export const FilterBar = ({ onSearch, isLoading = false, onSelectCard = null }) => {
  const [term, setTerm] = useState('')
  const [popularCards, setPopularCards] = useState([])
  const [loadingPopular, setLoadingPopular] = useState(false)

  // Carrega cartas populares ao montar o componente
  useEffect(() => {
    const loadPopular = async () => {
      setLoadingPopular(true)
      try {
        const cards = await fetchPopularCards(8)
        setPopularCards(cards)
      } catch (err) {
        console.error('Erro ao carregar cartas populares:', err)
      } finally {
        setLoadingPopular(false)
      }
    }
    loadPopular()
  }, [])

  // debounce enquanto digita: chama onSearch 500ms após o usuário parar
  useEffect(() => {
    const t = setTimeout(() => {
      // enviar termo mesmo que vazio para limpar resultados
      onSearch(term)
    }, 500)

    return () => clearTimeout(t)
  }, [term, onSearch])

  const handleSubmit = (e) => {
    e.preventDefault()
    // disparar imediato
    onSearch(term)
  }

  const handlePopularCardClick = (card) => {
    setTerm(card.name)
    onSearch(card.name)
    if (onSelectCard) onSelectCard(card)
  }

  return (
    <div className="bg-gradient-to-b from-secondary via-secondary to-transparent backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
          <div className="flex items-center gap-3">
            <Search size={20} className="text-gold" />
            <h2 className="text-xl md:text-2xl font-bold text-white">Pesquisar Carta</h2>
          </div>

          <div className="ml-6 flex-1">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Digite o nome da carta..."
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-gold text-primary font-semibold hover:opacity-90 disabled:opacity-60"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Cartas Populares - Mostradas sempre abaixo do campo de busca */}
        {!term && (
          <div className="mt-8 pt-6 border-t border-gold/20">
            <div className="flex items-center gap-2 mb-4">
              <Star size={20} className="text-gold" />
              <h3 className="text-lg font-semibold text-gold">Cartas Populares</h3>
            </div>

            {loadingPopular ? (
              <div className="text-center py-6">
                <div className="animate-spin h-6 w-6 border-2 border-gold border-t-transparent rounded-full mx-auto" />
                <p className="text-slate-400 text-sm mt-2">Carregando cartas incríveis...</p>
              </div>
            ) : popularCards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {popularCards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => handlePopularCardClick(card)}
                    className="text-left p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-gold/50 hover:bg-slate-800 transition-all duration-200 group"
                  >
                    <div className="font-semibold text-white group-hover:text-gold transition-colors truncate">
                      {card.name}
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-1 mt-1">
                      {card.type_line}
                    </div>
                    {card.prices?.usd && (
                      <div className="text-xs text-gold mt-2">
                        ${card.prices.usd}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm py-4">Nenhuma carta popular encontrada</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
