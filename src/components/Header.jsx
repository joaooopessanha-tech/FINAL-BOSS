'use client'

import React, { useState, useEffect } from 'react'
import { ShoppingCart, Sparkles, LogOut, User, LogIn, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import LoginModal from './LoginModal'

export const Header = ({ cartCount = 0, onCartClick }) => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const { theme, toggleTheme, mounted } = useTheme()

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setLoggedInUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Falha ao ler o localStorage:', error)
    }
  }, [])

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setLoggedInUser(null)
  }

  if (!mounted) return null

  return (
    <>
      <header className="sticky top-0 z-50 bg-secondary/80 backdrop-blur-md border-b border-gold/20">
        <nav className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Sparkles className="text-gold" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
                MTG Ranker
              </h1>
            </div>

            {/* Ações do Usuário & Carrinho */}
            <div className="flex items-center gap-4">
              {/* Botão de Tema */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-slate-700/60 transition-colors text-slate-300 hover:text-gold"
                aria-label="Alternar tema"
                title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
              >
                {theme === 'dark' ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>

              <div className="hidden md:flex items-center gap-4">
                {loggedInUser ? (
                  // Se logado, mostra perfil e botão de sair
                  <>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <User size={18} className="text-gold" />
                      <span>Bem-vindo, {loggedInUser.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600/20 text-red-300 text-sm font-semibold hover:bg-red-600/40 transition-colors"
                      aria-label="Sair"
                    >
                      <LogOut size={14} />
                      Sair
                    </button>
                  </>
                ) : (
                  // Se não logado, mostra botão de entrar
                  <button
                    onClick={() => setLoginModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold text-primary text-sm font-bold hover:bg-yellow-400 transition-colors shadow"
                    aria-label="Entrar"
                  >
                    <LogIn size={16} />
                    Entrar
                  </button>
                )}
              </div>

              {/* Botão do Carrinho */}
              <button
                onClick={onCartClick}
                className="relative p-3 rounded-full hover:bg-slate-700/60 transition-colors"
                aria-label="Ver carrinho"
              >
                <ShoppingCart className="text-slate-200" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Ícone de Perfil para Mobile */}
              <div className="md:hidden">
                <button
                  onClick={() => (loggedInUser ? handleLogout() : setLoginModalOpen(true))}
                  className="p-3 rounded-full hover:bg-slate-700/60 transition-colors"
                  aria-label={loggedInUser ? 'Sair' : 'Entrar'}
                >
                  {loggedInUser ? <LogOut className="text-red-300" /> : <User className="text-slate-200" />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Modal de Login */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}
