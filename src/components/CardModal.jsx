'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { X, Languages } from 'lucide-react'
import translateText from '../lib/translate'

export const CardModal = ({ card, onClose }) => {
  const [translated, setTranslated] = useState(null)
  const [translating, setTranslating] = useState(false)
  const [translateError, setTranslateError] = useState(null)
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    // Animação de entrada
    setIsShowing(true)

    const onKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const handleClose = () => {
    setIsShowing(false)
    // Aguarda a animação de saída
    setTimeout(onClose, 300)
  }

  const handleTranslate = async () => {
    const original = getOracleText()
    if (!original || translated) return

    setTranslateError(null)
    setTranslating(true)
    try {
      const res = await translateText(original, 'pt')
      if (res && !res.trim().startsWith('<')) {
        setTranslated(res)
      } else {
        throw new Error('Resposta inválida da API de tradução.')
      }
    } catch (err) {
      setTranslateError('Erro ao traduzir.')
    } finally {
      setTranslating(false)
    }
  }

  useEffect(() => {
    setTranslated(null)
    setTranslateError(null)
  }, [card])

  const getOracleText = useCallback(() => {
    if (card.oracle_text) return card.oracle_text
    if (card.card_faces && card.card_faces[0]?.oracle_text) return card.card_faces[0].oracle_text
    return ''
  }, [card])

  if (!card) return null

  // Prioriza imagem de alta resolução
  const image =
    card.image_uris?.large ||
    card.image_uris?.normal ||
    (card.card_faces && (card.card_faces[0]?.image_uris?.large || card.card_faces[0]?.image_uris?.normal)) ||
    null

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-300 ${
        isShowing ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className={`max-w-5xl w-full mx-4 bg-slate-900 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
          isShowing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()} // Impede que o clique no conteúdo feche o modal
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-6">
          <div className="w-full md:w-80 flex-shrink-0">
            {image ? (
              <div className="w-full rounded-lg overflow-hidden shadow-lg border-2 border-gold/40">
                <Image
                  src={image}
                  alt={card.name}
                  width={600}
                  height={840}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            ) : (
              <div className="w-full h-96 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                Sem imagem
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white">{card.name}</h3>
                <p className="text-sm text-slate-300 mt-1">
                  {card.set_name} • #{card.collector_number || ''}
                </p>
              </div>

              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 transition-colors"
                aria-label="Fechar modal"
              >
                <X className="text-slate-200" />
              </button>
            </div>

            <div className="mt-4 text-slate-200 text-base leading-relaxed max-h-60 overflow-y-auto pr-2">
              {getOracleText() ? (
                <>
                  <p className="whitespace-pre-wrap font-serif">{getOracleText()}</p>

                  <div className="mt-4">
                    {!translated && !translateError && (
                      <button
                        onClick={handleTranslate}
                        disabled={translating}
                        className="flex items-center gap-2 px-3 py-1 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-60 rounded-md text-sm text-white transition-colors"
                      >
                        <Languages size={14} />
                        {translating ? 'Traduzindo...' : 'Traduzir para Português'}
                      </button>
                    )}

                    {translateError && (
                      <div className="text-sm text-rose-400 mt-2 p-2 bg-rose-500/10 rounded-md">
                        {translateError}
                      </div>
                    )}

                    {translated && (
                      <div className="mt-4 bg-slate-800/60 p-3 rounded-md animate-fade-in border border-slate-700">
                        <div className="text-slate-300 text-xs font-bold tracking-wider">Tradução (pt-BR)</div>
                        <div className="mt-1 text-slate-100 text-base whitespace-pre-wrap font-serif">
                          {translated}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-slate-400 italic">Sem texto de regras disponível.</p>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-slate-300">
                <strong>Tipo:</strong> <span className="text-slate-400">{card.type_line || 'N/A'}</span>
              </div>
              <div className="text-slate-300">
                <strong>Raridade:</strong>{' '}
                <span className="capitalize text-slate-400">{card.rarity || 'N/A'}</span>
              </div>
              <div className="text-slate-300">
                <strong>Data de Lançamento:</strong>{' '}
                <span className="text-slate-400">{card.released_at || 'N/A'}</span>
              </div>
              <div className="text-slate-300">
                <strong>Preço (USD):</strong>
                <span className="ml-2 text-green-400 font-bold">
                  ${card.prices?.usd || card.prices?.usd_foil || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardModal
