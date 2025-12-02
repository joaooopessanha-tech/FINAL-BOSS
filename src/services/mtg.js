import translateText from "../lib/translate"

export async function getMTGCard(name) {
  const url = `https://api.scryfall.com/cards/named?fuzzy=${name}`

  const res = await fetch(url)
  const data = await res.json()

  const translated = {
    name: await translateText(data.name),
    type_line: await translateText(data.type_line),
    oracle_text: await translateText(data.oracle_text),
    flavor_text: data.flavor_text ? await translateText(data.flavor_text) : "",
    image: data.image_uris?.normal
  }

  return translated
}
