import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#edc53f',
}

export const metadata = {
  metadataBase: new URL('https://mtg-ranker.com'),
  title: 'MTG Ranker - Análise e Ranking de Cartas de Magic: The Gathering',
  description:
    'Encontre, analise e classifique as melhores cartas de Magic: The Gathering. Veja preços, raridade e dados históricos da API Scryfall para otimizar seus decks e coleções.',
  keywords: [
    'Magic The Gathering',
    'MTG',
    'Scryfall',
    'Ranking de Cartas',
    'Análise de Cartas',
    'Preços de Cartas',
    'Cartas de Magic',
    'Decks de MTG',
    'TCG',
    'Trading Card Game',
    'Deck Building',
  ],
  authors: [{ name: 'MTG Ranker Team', url: 'https://mtg-ranker.com' }],
  creator: 'MTG Ranker',
  publisher: 'MTG Ranker',
  robots: 'index, follow',

  // Open Graph (para redes sociais)
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://mtg-ranker.com',
    title: 'MTG Ranker - Análise e Ranking de Cartas de Magic: The Gathering',
    description: 'A ferramenta definitiva para entusiastas de Magic. Analise, classifique e descubra novas cartas.',
    siteName: 'MTG Ranker',
    images: [
      {
        url: '/og-image.png', // Adicionar uma imagem de preview
        width: 1200,
        height: 630,
        alt: 'MTG Ranker - Logo e Cartas de Magic',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'MTG Ranker - Análise e Ranking de Cartas de Magic',
    description: 'Encontre e analise as melhores cartas de Magic para seus decks.',
    images: ['/twitter-image.png'], // Adicionar uma imagem para o Twitter
  },

  // Ícones
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  
  // Manifest
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://mtg-ranker.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'MTG Ranker',
              description: 'Magic The Gathering Card Ranking and Analysis Tool',
              url: 'https://mtg-ranker.com',
              applicationCategory: 'Game',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body className="bg-gradient-to-br from-primary via-secondary to-accent min-h-screen antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
