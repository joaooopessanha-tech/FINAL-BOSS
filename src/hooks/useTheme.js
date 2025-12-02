import { useState, useEffect, useCallback } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState('dark')
  const [mounted, setMounted] = useState(false)

  const applyTheme = useCallback((newTheme) => {
    const html = document.documentElement
    html.classList.remove('light', 'dark')
    html.classList.add(newTheme)
    localStorage.setItem('theme', newTheme)
  }, [])

  // Inicializa o tema a partir do localStorage ou preferência do sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    applyTheme(initialTheme)
    setMounted(true)
  }, [applyTheme])

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark'
      applyTheme(newTheme)
      return newTheme
    })
  }, [applyTheme])

  return { theme, toggleTheme, mounted }
}
