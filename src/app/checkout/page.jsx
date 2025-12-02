'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getPrice } from '@/lib/utils'

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('mtg-cart')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e)
    }
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + getPrice(item.card) * item.qty, 0)
  const shipping = cartItems.length > 0 ? 25.0 : 0
  const total = subtotal + shipping

  return (
    <div className="bg-secondary min-h-screen text-white">
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.qty, 0)} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-gold transition-colors">
            <ArrowLeft size={18} />
            Voltar para a loja
          </Link>
          <h1 className="text-4xl font-black mt-4 bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
            Finalizar Compra
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Coluna da Esquerda: Resumo do Pedido */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h2 className="text-2xl font-bold mb-6">Resumo do Pedido</h2>
              {cartItems.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {cartItems.map(({ card, image, qty }) => (
                      <div key={card.id} className="flex items-center gap-4">
                        <img src={image} alt={card.name} className="w-14 h-18 object-cover rounded-md" />
                        <div className="flex-1">
                          <p className="font-semibold">{card.name}</p>
                          <p className="text-sm text-slate-400">x{qty}</p>
                        </div>
                        <p className="font-semibold">${(getPrice(card) * qty).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-700 space-y-3">
                    <div className="flex justify-between text-slate-300">
                      <span>Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Frete</span>
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold text-gold mt-2">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-slate-400 text-center py-8">Seu carrinho está vazio.</p>
              )}
            </div>
          </div>

          {/* Coluna da Direita: Formulários */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="space-y-8">
              {/* Endereço de Entrega */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Endereço de Entrega</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Nome" className="form-input" />
                  <input type="text" placeholder="Sobrenome" className="form-input" />
                  <input type="email" placeholder="Email" className="form-input md:col-span-2" />
                  <input type="text" placeholder="Endereço" className="form-input md:col-span-2" />
                  <input type="text" placeholder="Cidade" className="form-input" />
                  <input type="text" placeholder="CEP" className="form-input" />
                </div>
              </div>

              {/* Pagamento */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Pagamento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Número do Cartão" className="form-input md:col-span-2" />
                  <input type="text" placeholder="Nome no Cartão" className="form-input md:col-span-2" />
                  <input type="text" placeholder="Validade (MM/AA)" className="form-input" />
                  <input type="text" placeholder="CVV" className="form-input" />
                </div>
              </div>

              <button
                disabled={cartItems.length === 0}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 text-lg font-bold rounded-lg bg-green-600 text-white hover:bg-green-500 transition-all shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock size={20} />
                Pagar com Segurança
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
          border-radius: 0.5rem;
          background-color: #1e293b; /* slate-800 */
          border: 1px solid #334155; /* slate-700 */
          color: white;
          transition: all 0.2s;
        }
        .form-input:focus {
          border-color: #f59e0b; /* gold */
          outline: none;
          box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.5);
        }
      `}</style>
    </div>
  )
}

export default CheckoutPage
