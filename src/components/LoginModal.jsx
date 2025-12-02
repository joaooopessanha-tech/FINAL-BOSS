'use client'

import React, { useState, useEffect } from 'react'
import { X, User } from 'lucide-react'

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('admin')
  const [error, setError] = useState('')
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsShowing(true), 10)
    } else {
      setIsShowing(false)
    }
  }, [isOpen])

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'admin@gmail.com' && password === 'admin') {
      const user = { email: 'admin@gmail.com', name: 'Admin' }
      localStorage.setItem('user', JSON.stringify(user))
      onLoginSuccess(user)
      handleClose()
    } else {
      setError('Credenciais inválidas. Tente "admin@gmail.com" e "admin".')
    }
  }

  const handleClose = () => {
    setIsShowing(false)
    setTimeout(onClose, 300)
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center transition-opacity duration-300 ${
        isShowing ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className={`relative w-full max-w-md m-4 bg-slate-900 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out ${
          isShowing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="text-slate-200" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Acessar Conta</h2>
            <p className="text-slate-400">Entre para gerenciar seu ranking e perfil.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 text-base rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 text-base rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors"
                required
              />
            </div>

            {error && <p className="text-sm text-red-400 text-center bg-red-500/10 p-3 rounded-lg">{error}</p>}

            <button
              type="submit"
              className="w-full px-5 py-3 text-base font-bold rounded-lg bg-gold text-primary hover:bg-yellow-400 transition-all shadow-lg transform hover:scale-105"
            >
              Entrar
            </button>
          </form>

          <p className="text-xs text-slate-500 text-center mt-6">
            Use <code className="bg-slate-700 p-1 rounded">admin@gmail.com</code> e <code className="bg-slate-700 p-1 rounded">admin</code> para testar.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
