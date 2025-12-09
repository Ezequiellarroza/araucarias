import { useTranslation } from 'react-i18next'
import { changeLanguage } from '../../i18n'

/**
 * LanguageSelector
 * 
 * Selector de idioma con estilo limpio.
 * 
 * @param {Object} props
 * @param {string} props.variant - 'default' | 'compact' | 'text'
 * @param {boolean} props.isScrolled - Si el header está en estado scrolled
 * @param {string} props.className - Clases adicionales
 */
function LanguageSelector({ variant = 'default', isScrolled = true, className = '' }) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  // Configuración de idiomas con labels
  const languages = [
    { code: 'es', label: 'ES', fullLabel: 'Español' },
    { code: 'en', label: 'EN', fullLabel: 'English' }
  ]

  const handleLanguageChange = (langCode) => {
    if (langCode !== currentLang) {
      changeLanguage(langCode)
    }
  }

  // Variante texto: solo texto sin fondo (para menú mobile)
  if (variant === 'text') {
    return (
      <div className={`flex items-center gap-1 text-sm ${className}`}>
        {languages.map((lang, index) => (
          <span key={lang.code} className="flex items-center">
            <button
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                px-1 py-0.5 rounded transition-colors duration-200
                ${currentLang === lang.code
                  ? 'text-accent font-medium'
                  : 'text-text-secondary hover:text-text-primary'
                }
              `}
              aria-label={`Cambiar idioma a ${lang.fullLabel}`}
              aria-current={currentLang === lang.code ? 'true' : undefined}
            >
              {lang.label}
            </button>
            {index < languages.length - 1 && (
              <span className="text-text-secondary/50 mx-0.5">|</span>
            )}
          </span>
        ))}
      </div>
    )
  }

  // Variante compacta: para el header (respeta isScrolled)
  if (variant === 'compact') {
    return (
      <div 
        className={`
          inline-flex rounded-lg overflow-hidden transition-colors duration-200
          ${isScrolled 
            ? 'bg-gray-100 dark:bg-white/10' 
            : 'bg-white/10'
          }
          ${className}
        `}
        role="group"
        aria-label="Selector de idioma"
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`
              px-2.5 py-1.5 text-xs font-medium transition-all duration-200
              ${currentLang === lang.code
                ? 'bg-accent text-white'
                : isScrolled
                  ? 'text-text-secondary hover:text-text-primary dark:text-gray-300 dark:hover:text-white'
                  : 'text-white/70 hover:text-white'
              }
            `}
            aria-label={`Cambiar idioma a ${lang.fullLabel}`}
            aria-current={currentLang === lang.code ? 'true' : undefined}
          >
            {lang.label}
          </button>
        ))}
      </div>
    )
  }

  // Variante default: botones con fondo (para otros usos)
  return (
    <div 
      className={`inline-flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-white/10 ${className}`}
      role="group"
      aria-label="Selector de idioma"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200
            ${currentLang === lang.code
              ? 'bg-white dark:bg-white/20 text-accent shadow-sm'
              : 'bg-transparent text-text-secondary hover:text-text-primary'
            }
          `}
          aria-label={`Cambiar idioma a ${lang.fullLabel}`}
          aria-current={currentLang === lang.code ? 'true' : undefined}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector