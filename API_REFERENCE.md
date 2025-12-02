# API Reference - MTG Ranker

## Funções de Fetch da API

### fetchCardsByMonth

Busca cartas lançadas em um período específico (mês/ano).

```typescript
import { fetchCardsByMonth } from '@/lib/api'

const cards = await fetchCardsByMonth(2024, 1) // Janeiro de 2024
```

**Parâmetros:**
- `year: number` - Ano (ex: 2024)
- `month: number` - Mês (1-12)

**Retorno:**
```typescript
Card[]
```

**Query Scryfall:**
```
released:2024-01-01 to 2024-01-31
```

---

### fetchCardsByYear

Busca todas as cartas lançadas em um ano.

```typescript
import { fetchCardsByYear } from '@/lib/api'

const cards = await fetchCardsByYear(2023)
```

**Parâmetros:**
- `year: number` - Ano (ex: 2023)

**Retorno:**
```typescript
Card[]
```

**Query Scryfall:**
```
released:2023-01-01 to 2023-12-31
```

---

### fetchCardsByRarity

Busca cartas de uma raridade específica.

```typescript
import { fetchCardsByRarity } from '@/lib/api'

const mythicCards = await fetchCardsByRarity('mythic')
const rareCards = await fetchCardsByRarity('rare')
const uncommonCards = await fetchCardsByRarity('uncommon')
const commonCards = await fetchCardsByRarity('common')
```

**Parâmetros:**
- `rarity: string` - Raridade ('common', 'uncommon', 'rare', 'mythic')

**Retorno:**
```typescript
Card[]
```

---

### fetchCardsByColor

Busca cartas de uma cor específica.

```typescript
import { fetchCardsByColor } from '@/lib/api'

const whiteCards = await fetchCardsByColor('W')  // Branco
const blueCards = await fetchCardsByColor('U')   // Azul
const blackCards = await fetchCardsByColor('B')  // Preto
const redCards = await fetchCardsByColor('R')    // Vermelho
const greenCards = await fetchCardsByColor('G')  // Verde
```

**Parâmetros:**
- `color: string` - Cor ('W', 'U', 'B', 'R', 'G')

**Retorno:**
```typescript
Card[]
```

---

### fetchRandomCards

Busca cartas aleatórias (ordenadas por poder).

```typescript
import { fetchRandomCards } from '@/lib/api'

const randomCards = await fetchRandomCards(20)
```

**Parâmetros:**
- `limit: number` - Quantidade máxima de cartas (padrão: 50)

**Retorno:**
```typescript
Card[]
```

---

## Tipos de Dados

### Card

Estrutura de uma carta Magic The Gathering.

```typescript
interface Card {
  // Identificadores
  id: string
  name: string
  uri: string
  
  // Tipo e Raridade
  type_line?: string           // Ex: "Creature — Human Wizard"
  rarity?: string              // "common" | "uncommon" | "rare" | "mythic"
  
  // Imagens
  image_uris?: {
    small: string
    normal: string
    large: string
    png: string
    art_crop: string
    border_crop: string
  }
  
  // Custo e Habilidades
  mana_cost?: string           // Ex: "{2}{W}{B}"
  cmc?: number                 // Custo de mana convertido
  power?: string               // Poder (para criaturas)
  toughness?: string           // Resistência (para criaturas)
  loyalty?: number             // Lealdade (para planeswalkers)
  
  // Cores
  colors?: string[]            // ["W", "U", "B", "R", "G"]
  color_identity?: string[]
  
  // Informações de Lançamento
  set_name?: string            // Nome do set
  set?: string                 // Código do set
  released_at?: string         // Data ISO: "2024-01-15"
  lang?: string                // Idioma
  
  // Efeitos
  oracle_text?: string         // Descrição do efeito
  
  // Preços
  prices?: {
    usd?: string               // Preço em USD
    usd_foil?: string          // Preço foil em USD
    eur?: string               // Preço em EUR
    tix?: string               // Preço em MTGO Tickets
  }
  
  // Faces Duplas
  card_faces?: Array<{
    image_uris?: {
      normal: string
    }
    name?: string
  }>
  
  // Links
  scryfall_uri?: string
}
```

---

## Hooks Customizados

### useCards

Hook para gerenciar estado de cartas com fetch automático.

```typescript
import { useCards } from '@/hooks/useCards'

export function MyComponent() {
  const { cards, isLoading, error, refetch } = useCards({
    year: 2024,
    month: 1,
    category: 'all'  // 'all', 'rarity-mythic', 'color-white', etc.
  })
  
  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {cards.map(card => (
        <div key={card.id}>{card.name}</div>
      ))}
      <button onClick={() => refetch()}>Recarregar</button>
    </div>
  )
}
```

**Propriedades de Entrada:**
- `year?: number` - Ano (padrão: ano atual)
- `month?: number` - Mês (padrão: mês atual)
- `rarity?: string` - Raridade
- `color?: string` - Cor
- `category?: string` - Categoria
- `enabled?: boolean` - Habilitar fetch (padrão: true)

**Propriedades de Retorno:**
```typescript
{
  cards: Card[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}
```

---

## Exemplos de Uso

### 1. Buscar cartas de um mês específico

```typescript
import { fetchCardsByMonth } from '@/lib/api'

async function getJanuaryCards() {
  try {
    const cards = await fetchCardsByMonth(2024, 1)
    console.log(`Encontradas ${cards.length} cartas`)
  } catch (error) {
    console.error('Erro ao buscar cartas:', error)
  }
}
```

### 2. Buscar cartas míticas de um ano

```typescript
import { fetchCardsByRarity } from '@/lib/api'

async function getMythicCards() {
  const cards = await fetchCardsByRarity('mythic')
  return cards
    .filter(card => card.released_at?.startsWith('2024'))
    .sort((a, b) => 
      parseFloat(b.prices?.usd || '0') - parseFloat(a.prices?.usd || '0')
    )
}
```

### 3. Componente com filtros dinâmicos

```typescript
'use client'

import { useState } from 'react'
import { useCards } from '@/hooks/useCards'

export function CardBrowser() {
  const [filter, setFilter] = useState({ year: 2024, month: 1, category: 'all' })
  const { cards, isLoading } = useCards(filter)
  
  return (
    <div>
      <select value={filter.month} onChange={e => 
        setFilter({...filter, month: parseInt(e.target.value)})
      }>
        {Array.from({length: 12}, (_, i) => i + 1).map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      
      {isLoading ? 'Carregando...' : `${cards.length} cartas encontradas`}
    </div>
  )
}
```

---

## Tratamento de Erros

A API Scryfall pode retornar erros em várias situações:

```typescript
import axios from 'axios'

async function safeCardFetch() {
  try {
    const cards = await fetchCardsByMonth(2024, 1)
    return cards
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.error('Cartas não encontradas')
      } else if (error.response?.status === 429) {
        console.error('Rate limit atingido - aguarde')
      } else {
        console.error('Erro da API:', error.message)
      }
    }
    return []
  }
}
```

---

## Rate Limiting

A API Scryfall tem limite de **120 requisições por minuto**.

```typescript
// Implementar fila se necessário
async function* fetchWithDelay() {
  for (let i = 0; i < 100; i++) {
    await new Promise(r => setTimeout(r, 500))
    yield await fetchCardsByYear(2000 + i)
  }
}
```

---

## Cache

Para melhorar performance, implemente cache local:

```typescript
const cardCache = new Map()

async function fetchWithCache(year: number, month: number) {
  const key = `${year}-${month}`
  
  if (cardCache.has(key)) {
    return cardCache.get(key)
  }
  
  const cards = await fetchCardsByMonth(year, month)
  cardCache.set(key, cards)
  return cards
}
```

---

## Estrutura de Resposta da API Scryfall

```json
{
  "object": "list",
  "total_cards": 1234,
  "has_more": true,
  "next_page": "https://api.scryfall.com/cards/search?...",
  "data": [
    {
      "object": "card",
      "id": "uuid",
      "name": "Card Name",
      "rarity": "rare",
      "released_at": "2024-01-15",
      ...
    }
  ]
}
```

---

## Mais Recursos

- Documentação Scryfall: https://scryfall.com/docs/api
- Status da API: https://status.scryfall.com/
- Search Syntax: https://scryfall.com/docs/syntax
