'use client'

import React from 'react'
import { Heart, Github, Mail } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gold/20 bg-secondary/50 backdrop-blur-md mt-20 md:mt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gold mb-3">MTG Ranker</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              A ferramenta definitiva para analisar e classificar as melhores cartas de Magic The Gathering.
              Dados em tempo real da API Scryfall.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Documentação
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  API Scryfall
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Guia de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Conecte-se</h4>
            <div className="flex gap-4">
              {[
                { icon: Github, label: 'GitHub', href: '#' },
                { icon: Mail, label: 'Email', href: '#' },
              ].map((social, idx) => {
                const Icon = social.icon
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="p-3 rounded-full bg-slate-700 hover:bg-gold/20 border border-slate-600 hover:border-gold text-slate-300 hover:text-gold transition-all"
                    title={social.label}
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent my-8 md:my-10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-slate-400">
          <p>
            © {currentYear} MTG Ranker. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            Feito com <Heart size={16} className="text-red-500 fill-red-500" /> para a comunidade MTG
          </div>
          <p>
            Magic: The Gathering é marca registrada da Wizards of the Coast.
          </p>
        </div>
      </div>
    </footer>
  )
}
