# Arquitetura do Projeto - MTG Ranker

## 🏗️ Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser / Client                        │
│  (Next.js App Router + React 18 + Tailwind CSS)            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP/HTTPS
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              MTG Ranker Application Layer                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  Page Components                       │  │
│  │  (page.tsx) → CardRanker.tsx → Header, FilterBar     │  │
│  └───────────────────────────────────────────────────────┘  │
│                       ↓                                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              UI Components Layer                       │  │
│  │  CardRow | FilterBar | Header | Footer               │  │
│  └───────────────────────────────────────────────────────┘  │
│                       ↓                                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Hooks & Logic Layer                       │  │
│  │  useCards (State Management + API Calls)             │  │
│  └───────────────────────────────────────────────────────┘  │
│                       ↓                                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              API Abstraction Layer                     │  │
│  │  lib/api.ts (Axios + Error Handling)                 │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP REST API (Axios)
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              Scryfall API (Third-party)                    │
│  https://api.scryfall.com/cards/search                     │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estrutura de Diretórios

```
projeto_final_mtg/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Layout raiz + SEO
│   │   ├── page.tsx                 # Página principal
│   │   ├── globals.css              # Estilos globais
│   │   ├── sitemap.ts               # SEO Sitemap
│   │   ├── robots.ts                # SEO Robots
│   │   ├── manifest.ts              # PWA Manifest
│   │   └── favicon.ico              # Favicon
│   │
│   ├── components/                  # Componentes React
│   │   ├── CardRanker.tsx          # Componente principal
│   │   ├── CardRow.tsx             # Card individual
│   │   ├── FilterBar.tsx           # Barra de filtros
│   │   ├── Header.tsx              # Cabeçalho
│   │   ├── Footer.tsx              # Rodapé
│   │   └── index.ts                # Exportações
│   │
│   ├── hooks/                       # React Hooks customizados
│   │   └── useCards.ts             # Hook para gerenciar cartas
│   │
│   ├── lib/                         # Utilities e Helpers
│   │   └── api.ts                  # Funções de chamada API
│   │
│   ├── types/                       # Definições TypeScript
│   │   └── scryfall.ts             # Tipos da API Scryfall
│   │
│   └── public/                      # Arquivos estáticos
│       ├── favicon.ico
│       ├── robots.txt
│       └── sitemap.xml
│
├── .github/                         # Configurações GitHub
│   └── workflows/                   # CI/CD (futuro)
│
├── .vscode/                         # Configurações VS Code
│   └── settings.json
│
├── .env.local                       # Variáveis de ambiente
├── .eslintrc.json                   # ESLint config
├── .gitignore                       # Git ignore
├── package.json                     # Dependências
├── package-lock.json                # Lock file
├── tsconfig.json                    # TypeScript config
├── tailwind.config.ts               # Tailwind config
├── postcss.config.js                # PostCSS config
├── next.config.js                   # Next.js config
├── README.md                        # Documentação principal
├── USAGE_GUIDE.md                   # Guia de uso
├── DEVELOPMENT.md                   # Guia de desenvolvimento
├── API_REFERENCE.md                 # Referência de API
└── ARCHITECTURE.md                  # Este arquivo
```

## 🔄 Fluxo de Dados

### 1. Usuário Interage com a UI
```
User clicks "Filter" → FilterBar.tsx
                    ↓
             onCategoryChange()
                    ↓
            setSelectedCategory()
                    ↓
             CardRanker.tsx updated
```

### 2. CardRanker Carrega Dados
```
CardRanker.tsx
      ↓
useCards hook (hooks/useCards.ts)
      ↓
fetchCardsByMonth() ou fetchCardsByRarity()
      ↓
lib/api.ts (axios.get())
      ↓
Scryfall API
      ↓
Response com Card[]
      ↓
State atualizado
      ↓
Component re-renderiza
      ↓
CardRow.tsx renderiza cada carta
```

### 3. Renderização de Componentes

```
layout.tsx (RootLayout)
    ↓
page.tsx (Home)
    ↓
CardRanker.tsx
    ├── Header.tsx (Renderização estática)
    ├── FilterBar.tsx (Interactive)
    └── CardRow[] (Map de cartas)
        └── Footer.tsx
```

## 🎯 Padrões de Design

### 1. Component Composition
```typescript
// Componentes menores e reutilizáveis
<CardRanker>
  ├── <Header />
  ├── <FilterBar />
  └── <CardRow /> (múltiplas)
```

### 2. Custom Hooks para Lógica
```typescript
// useCards encapsula toda a lógica de fetch
const { cards, isLoading, error } = useCards(options)
```

### 3. API Abstraction Layer
```typescript
// lib/api.ts abstrai as chamadas Scryfall
// Componentes não conhecem detalhes da API
```

### 4. Type Safety com TypeScript
```typescript
// Tipos definidos em types/scryfall.ts
// Props tipadas em componentes
```

## 🔐 Camadas de Segurança

### 1. Client-Side
- Validação de inputs no FilterBar
- Error boundaries (tratamento de erros)
- XSS protection via React

### 2. API Layer
- Timeout de 10 segundos
- Error handling com try/catch
- Rate limit awareness

### 3. Servidor (Next.js)
- Helmet headers (CSP)
- CORS handling
- Environment variables protegidas

## 📊 State Management

```
CardRanker.tsx
├── selectedYear (useState)
├── selectedMonth (useState)
├── selectedCategory (useState)
└── useCards hook
    ├── cards (state)
    ├── isLoading (state)
    ├── error (state)
    └── refetch (callback)
```

**Não usa Redux/Zustand**: 
- Complexidade desnecessária para este projeto
- Local state é suficiente
- URL query params poderiam ser adicionados para sharing

## 🎨 Styling Architecture

```
Global Styles (globals.css)
        ↓
Tailwind Configuration (tailwind.config.ts)
├── Custom Colors (primary, secondary, accent, gold)
├── Custom Animations (fade-in, slide-up, glow)
└── Custom Fonts (system fonts)
        ↓
Component Classes (className Props)
├── Responsive classes (sm:, md:, lg:)
├── Hover states (group-hover:)
└── Dark mode (built-in)
```

## 🚀 Otimizações de Performance

### 1. Code Splitting
- Next.js faz automaticamente
- Cada rota é seu próprio bundle

### 2. Lazy Loading
- Imagens com Next.js Image component (possível adicionar)
- Dynamic imports (possível adicionar)

### 3. Caching
- Browser cache via headers HTTP
- API cache possível com SWR/React Query

### 4. CSS Minification
- Tailwind purga CSS não usado
- PostCSS minifica

## 🔄 Ciclo de Vida de um Componente

### CardRanker.tsx
```
Render inicial
    ↓
useCards() hook executado
    ↓
fetchCardsByMonth() chamado
    ↓
isLoading = true
    ↓
Loader mostrado
    ↓
API responde
    ↓
cards = response.data
    ↓
isLoading = false
    ↓
CardRow[] renderizados
    ↓
Usuário vê resultado
```

## 🧪 Testabilidade

### Componentes testáveis via:
1. **Unit Tests**: Testes das funções da API
2. **Integration Tests**: Testes dos hooks
3. **E2E Tests**: Testes de user interaction

### Exemplo de teste:
```typescript
// fetchCardsByMonth.test.ts
import { fetchCardsByMonth } from '@/lib/api'

describe('fetchCardsByMonth', () => {
  it('should fetch cards for january 2024', async () => {
    const cards = await fetchCardsByMonth(2024, 1)
    expect(cards.length).toBeGreaterThan(0)
  })
})
```

## 📈 Escalabilidade

### Possíveis melhorias:
1. **Database**: Adicionar Prisma + PostgreSQL para cache
2. **Caching**: Redis para cache de resultados
3. **API Gateway**: Para rate limiting e caching
4. **Microserviços**: Separar em múltiplos serviços
5. **CDN**: Servir assets via CDN
6. **Workers**: Usar Web Workers para heavy computation

## 🌐 SEO Architecture

```
layout.tsx (metadata + JSON-LD schema)
    ↓
page.tsx (Open Graph tags)
    ↓
sitemap.ts (Dynamic sitemap)
    ↓
robots.ts (Bot directives)
    ↓
Componentes com semantic HTML
```

## 🔗 Integração com Scryfall API

```
Request Flow:
┌─────────────────────────────────┐
│ filterbar changed               │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ useCards hook detects change    │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ api.ts função chamada           │
│ (ex: fetchCardsByMonth)         │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ axios.get() com query params    │
│ - released: YYYY-MM-DD range    │
│ - order: usd                    │
│ - dir: desc                     │
│ - unique: prints                │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ https://api.scryfall.com/       │
│ cards/search                    │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ JSON response com Card[]        │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ State atualizado                │
│ componente re-renderiza         │
└─────────────────────────────────┘
```

## 📚 Recursos e Referências

- [Next.js Architecture](https://nextjs.org/docs/architecture)
- [React Patterns](https://react.dev/reference/react)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Scryfall API Docs](https://scryfall.com/docs/api)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Última atualização**: Novembro 2025
