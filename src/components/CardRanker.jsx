import React, { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { CardRow } from './CardRow'
import { FilterBar } from './FilterBar'
import { Header } from './Header'
import { useSearchCards } from '@/hooks/useSearchCards'
import CardModal from './CardModal'
import CartSidebar from './CartSidebar'
import { getPrice } from '@/lib/utils'

export const CardRanker = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { cards, isLoading, error } = useSearchCards({ query: searchTerm, enabled: !!searchTerm })
  const [selectedCard, setSelectedCard] = useState(null)

  // Cart state
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([]) // items: { card, image, qty }

  // Carrega o carrinho do localStorage ao iniciar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('mtg-cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e)
    }
  }, [])

  // Salva o carrinho no localStorage sempre que ele muda
  useEffect(() => {
    try {
      localStorage.setItem('mtg-cart', JSON.stringify(cart))
    } catch (e) {
      console.error('Failed to save cart to localStorage', e)
    }
  }, [cart])

  const getImageUrl = (card) => {
    // Tenta várias propriedades comuns para imagens
    return (
      card?.imageUrl ||
      card?.image_uri ||
      card?.image_uris?.normal ||
      card?.image_uris?.large ||
      card?.images?.large ||
      card?.images?.small ||
      card?.image ||
      ''
    )
  }

  const addCardToCart = (card) => {
    const image = getImageUrl(card)
    setCart((prev) => {
      const idx = prev.findIndex((it) => it.card.id === card.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 }
        return next
      }
      return [...prev, { card, image, qty: 1 }]
    })
    setCartOpen(true)
    toast.success(`✨ ${card.name} adicionada ao seu loot!`)
  }

  const removeFromCart = (cardId) => {
    setCart((prev) => prev.filter((it) => it.card.id !== cardId))
  }

  const updateQty = (cardId, qty) => {
    setCart((prev) =>
      prev.map((it) => (it.card.id === cardId ? { ...it, qty: Math.max(1, qty) } : it))
    )
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, it) => sum + getPrice(it.card) * it.qty, 0)

  const cartCount = cart.reduce((sum, it) => sum + it.qty, 0)

  return (
    <>
      <main
        className={`min-h-screen bg-gradient-to-br from-primary via-secondary to-accent pb-16 transition-all duration-300 ${
          cartOpen ? 'md:pr-96' : ''
        }`}
      >
        <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
        <FilterBar onSearch={(term) => setSearchTerm(term)} isLoading={isLoading} />

        {/* Seção de Título que estava no Header antigo */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
            Análise de Cartas Magic: The Gathering
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Descubra e analise as melhores cartas. Dados em tempo real da API Scryfall.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Section Title */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Resultado da Busca - <span className="text-gold">{searchTerm || 'Pesquisar'}</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-gold to-yellow-600 rounded-full" />
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-8 p-6 rounded-lg bg-red-500/20 border border-red-500/50 flex items-start gap-4">
              <AlertCircle size={24} className="text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-300 mb-1">Erro</h3>
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin h-12 w-12 border-4 border-gold border-t-transparent rounded-full mb-4" />
              <p className="text-slate-300 text-lg">Carregando cartas incríveis...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && cards.length === 0 && !error && (
            <div className="text-center py-20">
              <AlertCircle size={48} className="mx-auto text-slate-500 mb-4" />
              <p className="text-slate-300 text-lg">
                Digite o nome de uma carta para buscar (ex.: Black Lotus).
              </p>
            </div>
          )}

          {/* Cards Grid */}
          {!isLoading && cards.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:gap-6 animate-fade-in">
              {cards.map((card, idx) => (
                <CardRow
                  key={`${card.id}-${idx}`}
                  card={card}
                  showFull={true}
                  // ao clicar na linha: abre modal e adiciona ao carrinho
                  onClick={() => {
                    setSelectedCard(card)
                  }}
                  // Ação de clique apenas no botão "Adicionar"
                  onAdd={addCardToCart}
                />
              ))}
            </div>
          )}

          {selectedCard && (
            <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
          )}

          {/* Results Count */}
          {!isLoading && cards.length > 0 && (
            <div className="mt-12 p-6 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
              <p className="text-slate-300">
                Mostrando <span className="font-bold text-gold">{cards.length}</span> resultados
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onClear={clearCart}
        total={total}
        getPrice={getPrice}
      />
      <Toaster richColors position="bottom-left" />
    </>
  )
}
// ...existing code...