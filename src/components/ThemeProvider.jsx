'use client'

import { useEffect } from 'react'

export function ThemeProvider({ children }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    const html = document.documentElement
    html.classList.remove('light', 'dark')
    html.classList.add(initialTheme)
  }, [])

  return <>{children}</>
}
