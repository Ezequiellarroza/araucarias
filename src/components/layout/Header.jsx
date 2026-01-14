import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Sun, Moon } from 'lucide-react'

// Hooks y componentes
import { useTheme } from '../../hooks/useTheme'
import LanguageSelector from '../ui/LanguageSelector'
import Button from '../ui/Button'

import { asset } from '../../utils/assets'

/**
 * Header
 * 
 * Navegación principal con:
 * - Logo real + texto ARAUCARIAS
 * - Transparente con texto blanco en hero (solo Home)
 * - Fondo sólido al hacer scroll o en páginas internas
 */
function Header() {
  const { t } = useTranslation()
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Detectar si estamos en Home
  const isHome = location.pathname === '/'
  const shouldShowSolidHeader = isScrolled || !isHome

  // Links de navegación
  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/habitaciones', label: t('nav.suites') },

    { to: '/galeria', label: t('nav.gallery') },
    { to: '/ubicacion', label: t('nav.location') },
  ]

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Bloquear scroll cuando menú mobile está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Determinar qué logo usar
  const logoSrc = !shouldShowSolidHeader
  ? asset('images/brand/logo-icon-white.png')
  : isDark
    ? asset('images/brand/logo-icon-white.png')
    : asset('images/brand/logo-icon-black.png')

  // Clases de texto según estado del header
  const textColorClass = shouldShowSolidHeader
    ? 'text-text-primary'
    : 'text-white'

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${shouldShowSolidHeader
            ? 'bg-surface backdrop-blur-md shadow-sm'
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
              aria-label={t('common.hotelName')}
            >
              <img 
                src={logoSrc}
                alt="Araucarias"
                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className={`
                hidden sm:block font-heading text-xl font-semibold tracking-wide
                transition-colors duration-300
                ${textColorClass}
              `}>
                ARAUCARIAS
              </span>
            </Link>

            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${shouldShowSolidHeader
                      ? isActive
                        ? 'text-accent bg-sunken'
                        : 'text-text-secondary hover:text-text-primary hover:bg-sunken'
                      : isActive
                        ? 'text-white bg-white/20'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Acciones Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              
              {/* Selector de idioma */}
              <LanguageSelector variant="compact" isScrolled={shouldShowSolidHeader} />
              
              {/* Toggle Dark Mode */}
              <button
                onClick={toggleTheme}
                className={`
                  p-2.5 rounded-lg transition-all duration-200
                  ${shouldShowSolidHeader
                    ? 'bg-sunken hover:bg-accent/20'
                    : 'bg-white/10 hover:bg-white/20'
                  }
                `}
                aria-label={t('accessibility.toggleDarkMode')}
              >
                {isDark ? (
                  <Sun className={`w-5 h-5 ${shouldShowSolidHeader ? 'text-accent' : 'text-white'}`} />
                ) : (
                  <Moon className={`w-5 h-5 ${shouldShowSolidHeader ? 'text-accent' : 'text-white'}`} />
                )}
              </button>

              {/* CTA Reservar */}
              <Button to="/reservas" variant="primary" size="small">
                {t('nav.reserve')}
              </Button>
            </div>

            {/* Botón menú mobile */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`
                lg:hidden p-2.5 rounded-lg transition-all duration-200
                ${shouldShowSolidHeader
                  ? 'bg-sunken hover:bg-accent/20'
                  : 'bg-white/10 hover:bg-white/20'
                }
              `}
              aria-label={t('accessibility.openMenu')}
              aria-expanded={isMenuOpen}
            >
              <Menu className={`w-5 h-5 ${shouldShowSolidHeader ? 'text-text-primary' : 'text-white'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Menú Mobile Fullscreen */}
      <div
        className={`
          fixed inset-0 z-[100] lg:hidden transition-all duration-500
          ${isMenuOpen ? 'visible' : 'invisible'}
        `}
        aria-hidden={!isMenuOpen}
      >
        {/* Overlay */}
        <div
          className={`
            absolute inset-0 bg-surface/98 backdrop-blur-xl
            transition-opacity duration-500
            ${isMenuOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Contenido del menú */}
        <div
          className={`
            relative h-full flex flex-col p-6
            transition-all duration-500 delay-100
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
        >
          {/* Header del menú */}
          <div className="flex items-center justify-between mb-12">
            <Link 
              to="/" 
              className="flex items-center gap-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <img 
  src={isDark ? asset('images/brand/logo-icon-white.png') : asset('images/brand/logo-icon-black.png')}
  alt="Araucarias"
  className="w-10 h-10 object-contain"
/>
              <span className="font-heading text-xl font-semibold tracking-wide text-text-primary">
                ARAUCARIAS
              </span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2.5 rounded-lg bg-sunken hover:bg-accent/20 transition-colors duration-200"
              aria-label={t('accessibility.closeMenu')}
            >
              <X className="w-5 h-5 text-text-primary" />
            </button>
          </div>

          {/* Links de navegación */}
          <nav className="flex-1 flex flex-col gap-2" aria-label="Navegación móvil">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `
                  px-4 py-4 rounded-lg text-lg font-medium transition-all duration-200
                  ${isActive
                    ? 'text-accent bg-sunken'
                    : 'text-text-primary hover:bg-sunken'
                  }
                `}
                style={{ 
                  transitionDelay: isMenuOpen ? `${150 + index * 50}ms` : '0ms' 
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Acciones del menú mobile */}
          <div className="pt-6 border-t border-sunken space-y-4">
            
            {/* Fila de controles: idioma y dark mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">
                  {t('common.language')}:
                </span>
                <LanguageSelector variant="text" />
              </div>

              <button
                onClick={toggleTheme}
                className="p-3 rounded-lg bg-sunken hover:bg-accent/20 transition-colors duration-200"
                aria-label={t('accessibility.toggleDarkMode')}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-accent" />
                ) : (
                  <Moon className="w-5 h-5 text-accent" />
                )}
              </button>
            </div>

            {/* Botón CTA */}
            <Button 
              to="/reservas" 
              variant="primary" 
              className="w-full justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.reserve')}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header