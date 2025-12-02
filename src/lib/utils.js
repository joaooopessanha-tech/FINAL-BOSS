export const getPrice = (card) => {
  const p = card?.price ?? card?.prices?.usd ?? card?.prices?.usd_foil ?? card?.market?.average ?? 0
  const n = typeof p === 'string' ? parseFloat(p.replace(',', '.')) : Number(p)
  return isNaN(n) ? 0 : n
}
