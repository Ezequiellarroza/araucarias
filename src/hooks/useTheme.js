import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

/**
 * useTheme Hook
 * 
 * Hook para acceder al ThemeContext de forma segura.
 * Lanza error si se usa fuera del ThemeProvider.
 * 
 * @returns {Object} Objeto con estado y funciones del tema
 * 
 * @example
 * const { isDark, toggleTheme } = useTheme()
 * 
 * @example
 * const { setTheme, THEMES } = useTheme()
 * setTheme(THEMES.DARK)
 */
export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error(
      'useTheme debe ser usado dentro de un ThemeProvider. ' +
      'Asegurate de envolver tu aplicación con <ThemeProvider>.'
    )
  }

  return context
}

export default useTheme