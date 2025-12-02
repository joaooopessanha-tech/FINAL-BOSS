// ...existing code...
import React from 'react'

export const CardRow = ({ card, showFull = false, onClick, onAdd }) => {
  const resolveImage = (c) => {
    return (
      c?.imageUrl ||
      c?.image_uri ||
      c?.image ||
      c?.image_uris?.normal ||
      c?.image_uris?.small ||
      c?.image_uris?.large ||
      c?.images?.small ||
      c?.images?.large ||
      c?.card_images?.[0]?.image_url ||
      c?.card_faces?.[0]?.image_uris?.normal ||
      ''
    )
  }

  const img = resolveImage(card)

  return (
    <div
      className="flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 hover:bg-slate-800/60"
    >
      {img ? (
        <div className="w-16 h-20 flex-shrink-0" onClick={() => onClick && onClick(card)}>
          <img
            src={img}
            alt={card.name}
            className="w-full h-full object-cover rounded-md cursor-pointer transition-transform duration-200 hover:scale-110 hover:shadow-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      ) : (
        <div
          className="w-16 h-20 bg-slate-700 rounded-md flex items-center justify-center text-xs text-slate-300 cursor-pointer flex-shrink-0"
          onClick={() => onClick && onClick(card)}
        >
          sem imagem
        </div>
      )}

      <div className="flex-1 cursor-pointer" onClick={() => onClick && onClick(card)}>
        <p className="font-semibold text-white">{card.name}</p>
        {showFull && <p className="text-sm text-slate-400">{card.type_line ?? card.type}</p>}

        {/* Set/Edition Info */}
        {showFull && card.set_name && (
          <div className="flex items-center gap-2 mt-1">
            {/* Ícone do Set */}
            {card.set_icon_svg_uri && (
              <img src={card.set_icon_svg_uri} alt={card.set_name} className="w-4 h-4" />
            )}
            <p className="text-xs text-slate-500">{card.set_name}</p>
          </div>
        )}
      </div>

      {/* Grupo de Preço e Botão Adicionar */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="w-24 text-right">
          <div className="text-gold font-bold text-lg">
            ${Number(card?.price ?? card?.prices?.usd ?? 0).toFixed(2)}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation() // Impede que o clique no botão abra o modal
            onAdd && onAdd(card)
          }}
          className="bg-gold text-slate-900 font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors shadow-md"
          aria-label={`Adicionar ${card.name} ao carrinho`}
        >
          Adicionar
        </button>
      </div>
    </div>
  )
}
// ...existing code...