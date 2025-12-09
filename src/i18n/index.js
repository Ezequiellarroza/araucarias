import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Importar traducciones
import es from './es.json'
import en from './en.json'

// Constantes
const STORAGE_KEY = 'hotel-araucarias-language'
const DEFAULT_LANGUAGE = 'es'
const SUPPORTED_LANGUAGES = ['es', 'en']

/**
 * Detectar idioma inicial
 * Prioridad: localStorage > navegador > default (es)
 */
function detectLanguage() {
  // 1. Intentar desde localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
      return stored
    }

    // 2. Intentar desde el navegador
    const browserLang = navigator.language?.split('-')[0]
    if (browserLang && SUPPORTED_LANGUAGES.includes(browserLang)) {
      return browserLang
    }
  }

  // 3. Default
  return DEFAULT_LANGUAGE
}

// Configuración de i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en }
    },
    lng: detectLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    
    interpolation: {
      escapeValue: false // React ya escapa por defecto
    },

    // Opciones de debug (desactivar en producción)
    debug: false,

    // Configuración de react-i18next
    react: {
      useSuspense: true
    }
  })

/**
 * Cambiar idioma y persistir en localStorage
 * @param {string} lang - Código de idioma ('es' | 'en')
 */
export function changeLanguage(lang) {
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    i18n.changeLanguage(lang)
    localStorage.setItem(STORAGE_KEY, lang)
    
    // Actualizar atributo lang del documento
    document.documentElement.lang = lang
  }
}

/**
 * Obtener idioma actual
 * @returns {string} Código de idioma actual
 */
export function getCurrentLanguage() {
  return i18n.language
}

/**
 * Obtener lista de idiomas soportados
 * @returns {Array} Lista de códigos de idioma
 */
export function getSupportedLanguages() {
  return SUPPORTED_LANGUAGES
}

/**
 * Verificar si un idioma está soportado
 * @param {string} lang - Código de idioma a verificar
 * @returns {boolean}
 */
export function isLanguageSupported(lang) {
  return SUPPORTED_LANGUAGES.includes(lang)
}

// Exportar constantes útiles
export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, STORAGE_KEY }

export default i18n