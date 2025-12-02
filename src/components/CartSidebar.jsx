// ...new file...
import React from 'react'
import { X as XIcon, Trash2 as TrashIcon } from 'lucide-react'
import Link from 'next/link'

const CartSidebar = ({ open, onClose, items = [], onRemove, onUpdateQty, onClear, total, getPrice }) => {
  return (
    <aside
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-slate-900/95 backdrop-blur-md transform transition-transform duration-300 z-50 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-hidden={!open}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h3 className="text-lg font-bold text-white">Carrinho</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onClear}
              className="text-sm text-slate-300 hover:text-white px-2 py-1 rounded bg-red-600/10"
              aria-label="Limpar carrinho"
            >
              Limpar
            </button>
            <button onClick={onClose} aria-label="Fechar" className="p-2">
              <XIcon className="text-slate-300" />
            </button>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-auto">
          {items.length === 0 ? (
            <p className="text-slate-400">Carrinho vazio. Clique em uma carta para adicioná-la.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map(({ card, image, qty }) => (
                <li key={card.id} className="flex items-center gap-4">
                  {/* Controles de Quantidade e Remoção (Esquerda) */}
                  <div className="flex flex-col items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => onUpdateQty(card.id, Number(e.target.value))}
                      className="w-16 bg-slate-800 text-white text-center text-sm p-1 rounded"
                      aria-label={`Quantidade de ${card.name}`}
                    />
                    <button
                      onClick={() => onRemove(card.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                      aria-label={`Remover ${card.name}`}
                    >
                      <TrashIcon size={18} />
                    </button>
                  </div>

                  {/* Imagem e Detalhes (Direita) */}
                  <div className="flex-1 flex items-center gap-3">
                    {image ? (
                      <img
                        src={image}
                        alt={card.name}
                        className="w-12 h-16 object-cover rounded"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    ) : (
                      <div className="w-12 h-16 bg-slate-700 rounded flex items-center justify-center text-xs text-slate-300">
                        sem img
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{card.name}</p>
                      <p className="text-sm text-gold font-bold">
                        ${Number(getPrice(card)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400">Total</span>
            <span className="text-white font-bold">${Number(total).toFixed(2)}</span>
          </div>
          <Link href="/checkout" passHref>
            <button
              disabled={items.length === 0}
              className="w-full bg-gold text-slate-900 font-semibold py-2 rounded disabled:opacity-50"
            >
              Finalizar compra
            </button>
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default CartSidebar
// ...new file...