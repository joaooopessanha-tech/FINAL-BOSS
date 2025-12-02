import axios from 'axios'

const API_BASE_URL = 'https://api.scryfall.com'

const defaultConfig = {
  timeout: 60000,
  headers: {
    'Accept': 'application/json',
  },
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Busca todas as páginas da API Scryfall para uma query, com limite
export const fetchAllPages = async (params = {}, maxItems = 500) => {
  const collected = []
  let page = 1
  let hasMore = true

  while (hasMore && collected.length < maxItems) {
    try {
      const res = await axios.get(`${API_BASE_URL}/cards/search`, {
        params: { ...params, page },
        ...defaultConfig,
      })

      const data = res.data.data || []
      collected.push(...data)

      hasMore = !!res.data.has_more
      page += 1

      // Pequena espera para evitar rate limits
      if (hasMore) await sleep(150)
    } catch (err) {
      console.error('Erro em fetchAllPages:', err.message)
      break
    }
  }

  return collected.slice(0, maxItems)
}

export const fetchCardsByYear = async (year) => {
  try {
    const params = {
      q: `year:${year}`,
      order: 'usd',
      dir: 'desc',
      unique: 'prints',
    }

    const all = await fetchAllPages(params, 500)
    return all
  } catch (error) {
    console.error(`Erro ao buscar cartas de ${year}:`, error.message)
    return []
  }
}

export const fetchCardsByMonth = async (year, month) => {
  try {
    // A API não aceita o keyword `released` em todas as formas.
    // Buscamos por ano e filtramos localmente pelo campo `released_at` para obter o mês.
    const monthStr = String(month).padStart(2, '0')

    const params = {
      q: `year:${year}`,
      order: 'usd',
      dir: 'desc',
      unique: 'prints',
    }

    const all = await fetchAllPages(params, 1000)
    const filtered = all.filter((c) => {
      if (!c.released_at) return false
      return c.released_at.startsWith(`${year}-${monthStr}`)
    })

    return filtered
  } catch (error) {
    console.error(
      `Erro ao buscar cartas de ${year}-${month}:`,
      error.message
    )
    return []
  }
}

export const fetchCardsByRarity = async (rarity) => {
  try {
    const params = {
      q: `rarity:${rarity}`,
      order: 'usd',
      dir: 'desc',
      unique: 'prints',
    }

    const all = await fetchAllPages(params, 500)
    return all
  } catch (error) {
    console.error(`Erro ao buscar cartas ${rarity}:`, error.message)
    return []
  }
}

export const fetchCardsByColor = async (color) => {
  try {
    const params = {
      q: `color:${color}`,
      order: 'usd',
      dir: 'desc',
      unique: 'prints',
    }

    const all = await fetchAllPages(params, 500)
    return all
  } catch (error) {
    console.error(`Erro ao buscar cartas de cor ${color}:`, error.message)
    return []
  }
}

// Busca por nome (tenta correspondência exata primeiro, depois fallback)
export const fetchCardsByName = async (name, maxItems = 50) => {
  if (!name || !name.trim()) return []
  const cleaned = name.trim()
  try {
    // tentativa de correspondencia exata usando o operador !"name"
    const paramsExact = { q: `!"${cleaned.replace(/"/g, '')}"`, order: 'usd', dir: 'desc', unique: 'prints' }
    let res = await axios.get(`${API_BASE_URL}/cards/search`, { params: paramsExact, ...defaultConfig })
    let data = res.data.data || []

    if (!data || data.length === 0) {
      // fallback: busca por nome simples (pode trazer múltiplos resultados)
      const params = { q: cleaned, order: 'usd', dir: 'desc', unique: 'prints' }
      data = await fetchAllPages(params, maxItems)
    }

    return data.slice(0, maxItems)
  } catch (err) {
    console.error('Erro ao buscar por nome:', err.message)
    try {
      // última tentativa simples
      const params = { q: cleaned, order: 'usd', dir: 'desc', unique: 'prints' }
      const data = await fetchAllPages(params, maxItems)
      return data
    } catch (e) {
      console.error('Erro fallback busca por nome:', e.message)
      return []
    }
  }
}

export const fetchRandomCards = async (limit = 50) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/cards/search`,
      {
        params: {
          q: '-type:token',
          order: 'power',
          dir: 'desc',
          unique: 'prints',
          page: 1,
        },
        ...defaultConfig,
      }
    )

    return response.data.data?.slice(0, limit) || []
  } catch (error) {
    console.error('Erro ao buscar cartas aleat�rias:', error.message)
    return []
  }
}

export const fetchFallbackCards = async () => {
  try {
    // `has:prices` não é suportado pelo Scryfall. Usamos um fallback simples
    // que exclui tokens e ordena por preço USD (quando disponível).
    const response = await axios.get(
      `${API_BASE_URL}/cards/search`,
      {
        params: {
          q: '-type:token',
          order: 'usd',
          dir: 'desc',
          unique: 'prints',
          page: 1,
        },
        ...defaultConfig,
      }
    )

    return response.data.data || []
  } catch (error) {
    console.error('Erro ao buscar cartas de fallback:', error.message)
    return []
  }
}

// Busca cartas populares (com alto poder ou valor)
export const fetchPopularCards = async (limit = 12) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/cards/search`,
      {
        params: {
          q: '-type:token -is:digital',
          order: 'usd',
          dir: 'desc',
          unique: 'prints',
          page: 1,
        },
        ...defaultConfig,
      }
    )

    return response.data.data?.slice(0, limit) || []
  } catch (error) {
    console.error('Erro ao buscar cartas populares:', error.message)
    return []
  }
}
