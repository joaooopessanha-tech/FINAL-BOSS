const axios = require('axios')

async function run() {
  try {
    const q = '!"Black Lotus"'
    const res = await axios.get('https://api.scryfall.com/cards/search', {
      params: { q, unique: 'prints', order: 'usd', dir: 'desc', page: 1 },
      timeout: 60000,
    })

    const items = res.data.data || []
    const out = items.slice(0, 5).map((c) => ({
      id: c.id,
      name: c.name,
      image: c.image_uris?.normal || (c.card_faces && c.card_faces[0]?.image_uris?.normal) || null,
      oracle: c.oracle_text || (c.card_faces && c.card_faces[0]?.oracle_text) || null,
      prices: c.prices || null,
    }))

    console.log(JSON.stringify({ total: res.data.total_cards, returned: items.length, results: out }, null, 2))
  } catch (e) {
    if (e.response) {
      console.error('STATUS', e.response.status)
      console.error(JSON.stringify(e.response.data, null, 2))
    } else {
      console.error('ERR', e.message)
    }
  }
}

run()
