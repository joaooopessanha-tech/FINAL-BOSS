const axios = require('axios')

const API = 'https://api.scryfall.com/cards/search'
const defaultConfig = {
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'User-Agent': 'MTG-Ranker-Test/1.0',
  },
}

async function query(params) {
  try {
    const res = await axios.get(API, { params, ...defaultConfig })
    const total = res.data.total_cards ?? null
    const returned = Array.isArray(res.data.data) ? res.data.data.length : 0
    console.log(`# Query: ${params.q}`)
    console.log(`  total_cards: ${total}`)
    console.log(`  returned items: ${returned}`)
    console.log('  sample ids:', res.data.data?.slice(0,3).map(c => c.id) || [])
    console.log('')
  } catch (err) {
    console.error(`# Query erro: ${params.q}`)
    if (err.response) {
      console.error('  status:', err.response.status, err.response.statusText)
      try { console.error('  body:', JSON.stringify(err.response.data).slice(0,500)) } catch(e){}
    } else {
      console.error('  message:', err.message)
    }
    console.log('')
  }
}

async function run() {
  console.log('Iniciando testes Scryfall...')
  await query({ q: 'year:2024', order: 'usd', dir: 'desc', unique: 'prints', page: 1 })

  // Teste de mês: buscar pelo ano e filtrar localmente pelo campo released_at
  async function queryYearAndFilterMonth(year, month) {
    try {
      const res = await axios.get(API, { params: { q: `year:${year}`, order: 'usd', dir: 'desc', unique: 'prints', page: 1 }, ...defaultConfig })
      const all = res.data.data || []
      const monthStr = String(month).padStart(2, '0')
      const filtered = all.filter(c => c.released_at && c.released_at.startsWith(`${year}-${monthStr}`))
      console.log(`# Query (year:${year} filtered month ${month}):`)
      console.log(`  total_year: ${res.data.total_cards}`)
      console.log(`  returned year page items: ${all.length}`)
      console.log(`  filtered month items: ${filtered.length}`)
      console.log('  sample filtered ids:', filtered.slice(0,3).map(c => c.id))
      console.log('')
    } catch (err) {
      console.error('Erro ao buscar ano e filtrar mês', err.message)
    }
  }
  await query({ q: 'rarity:mythic', order: 'usd', dir: 'desc', unique: 'prints', page: 1 })
  await query({ q: 'color:W', order: 'usd', dir: 'desc', unique: 'prints', page: 1 })
  await query({ q: 'has:prices', order: 'usd', dir: 'desc', unique: 'prints', page: 1 })

  // exemplo: novembro de 2024
  await queryYearAndFilterMonth(2024, 11)

  // Teste de paginação: coletar múltiplas páginas até um limite
  async function queryAllPages(params, maxItems = 500) {
    const collected = []
    let page = 1
    let hasMore = true
    while (hasMore && collected.length < maxItems) {
      try {
        const res = await axios.get(API, { params: { ...params, page }, ...defaultConfig })
        const data = res.data.data || []
        collected.push(...data)
        hasMore = !!res.data.has_more
        page += 1
        if (hasMore) await new Promise(r => setTimeout(r, 150))
      } catch (err) {
        console.error('Erro paginando:', err.message)
        break
      }
    }
    console.log(`# Collected total items (paginated) for q=${params.q}:`, collected.length)
    console.log('')
    return collected
  }

  await queryAllPages({ q: 'year:2024', order: 'usd', dir: 'desc', unique: 'prints' }, 800)

  console.log('Testes finalizados.')
}

run()
