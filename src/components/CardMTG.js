"use client"
import { useEffect, useState } from "react"
import { getMTGCard } from "../services/mtg"

export default function CardMTG({ name }) {
  const [card, setCard] = useState(null)

  useEffect(() => {
    async function load() {
      const c = await getMTGCard(name)
      setCard(c)
    }
    load()
  }, [name])

  if (!card) return <p>Carregando...</p>

  return (
    <div style={{ maxWidth: 320 }}>
      <img src={card.image} style={{ width: "100%", borderRadius: 8 }} />
      <h2>{card.name}</h2>
      <p><strong>{card.type_line}</strong></p>
      <p>{card.oracle_text}</p>
      {card.flavor_text && (
        <em style={{ opacity: 0.7 }}>{card.flavor_text}</em>
      )}
    </div>
  )
}
