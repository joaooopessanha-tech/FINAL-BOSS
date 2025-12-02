import axios from 'axios'

const STORAGE_KEY = 'mtg_translations_v1'
const memoryCache = new Map()

function loadStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveStorage(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
  } catch {}
}

function mapTargetForDeepL(target) {
  if (!target) return 'EN'
  if (target.toLowerCase() === 'pt' || target.toLowerCase() === 'pt-br') return 'PT-BR'
  return target.toUpperCase()
}

export async function translateText(text, target = 'pt') {
  if (!text) return ''

  const cacheKey = `proxy::${target}::${text}`
  if (memoryCache.has(cacheKey)) return memoryCache.get(cacheKey)

  if (typeof window !== 'undefined') {
    const store = loadStorage()
    if (store[cacheKey]) {
      memoryCache.set(cacheKey, store[cacheKey])
      return store[cacheKey]
    }

    try {
      // Usando axios para uma chamada mais limpa e com melhor tratamento de erro.
      const res = await axios.post('/api/translate', {
        q: text,
        source: 'en',
        target
      });

      const translated = res.data?.translatedText || '';

      memoryCache.set(cacheKey, translated)
      store[cacheKey] = translated
      saveStorage(store)

      return translated
    } catch (error) {
      console.error('Falha na chamada da API de tradução:', error.response?.data || error.message);
      // Relança o erro para que o componente (CardModal) possa tratá-lo e exibir a mensagem de erro.
      throw error;
    }
  }

  return text
}

export default translateText
