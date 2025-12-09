import { createContext, useState, useEffect, useCallback } from 'react'

// Crear el context
export const ThemeContext = createContext(null)

// Constantes
const STORAGE_KEY = 'hotel-araucarias-theme'
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
}

/**
 * ThemeProvider
 * 
 * Maneja el estado del tema (light/dark) con:
 * - Detección de preferencia del sistema
 * - Persistencia en localStorage
 * - Aplicación de clase 'dark' en <html>
 */
export function ThemeProvider({ children }) {
  // Estado: 'light' | 'dark' | 'system'
  const [theme, setThemeState] = useState(() => {
    // Intentar recuperar del localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored && Object.values(THEMES).includes(stored)) {
        return stored
      }
    }
    // Default: seguir preferencia del sistema
    return THEMES.SYSTEM
  })

  // Estado derivado: el tema efectivo aplicado (siempre 'light' o 'dark')
  const [resolvedTheme, setResolvedTheme] = useState(THEMES.LIGHT)

  // Función para obtener la preferencia del sistema
  const getSystemTheme = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEMES.DARK
        : THEMES.LIGHT
    }
    return THEMES.LIGHT
  }, [])

  // Aplicar el tema al documento
  const applyTheme = useCallback((effectiveTheme) => {
    const root = document.documentElement
    
    if (effectiveTheme === THEMES.DARK) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Actualizar meta theme-color para móviles
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        effectiveTheme === THEMES.DARK ? '#1A1918' : '#EAE6E1'
      )
    }
    
    setResolvedTheme(effectiveTheme)
  }, [])

  // Efecto principal: aplicar tema cuando cambia
  useEffect(() => {
    const effectiveTheme = theme === THEMES.SYSTEM ? getSystemTheme() : theme
    applyTheme(effectiveTheme)
    
    // Guardar en localStorage
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme, getSystemTheme, applyTheme])

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    if (theme !== THEMES.SYSTEM) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, applyTheme])

  // Función para cambiar el tema
  const setTheme = useCallback((newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setThemeState(newTheme)
    }
  }, [])

  // Toggle entre light y dark (ignora system)
  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const effectiveCurrent = current === THEMES.SYSTEM ? getSystemTheme() : current
      return effectiveCurrent === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    })
  }, [getSystemTheme])

  // Valor del context
  const value = {
    theme,           // El valor guardado: 'light' | 'dark' | 'system'
    resolvedTheme,   // El tema efectivo aplicado: 'light' | 'dark'
    setTheme,        // Función para setear tema específico
    toggleTheme,     // Función para alternar light/dark
    isDark: resolvedTheme === THEMES.DARK,
    isLight: resolvedTheme === THEMES.LIGHT,
    isSystem: theme === THEMES.SYSTEM,
    THEMES           // Constantes disponibles
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext