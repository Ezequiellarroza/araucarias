import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useInView from '../../hooks/useInView'

function BookingWidget() {
  const { t } = useTranslation()
  const [sectionRef, sectionInView] = useInView({ threshold: 0.2 })
  const containerRef = useRef(null)

  useEffect(() => {
    const widgetId = 'f0df4a1e-997d-4ed8-8d7a-9d6e38922a95'
    
    const moveWidget = () => {
      const widget = document.querySelector(`[id^="root_${widgetId}"]`)
      
      if (widget && containerRef.current && !containerRef.current.contains(widget)) {
        containerRef.current.appendChild(widget)
        return true
      }
      return false
    }

    // Crear estilo para mostrar el widget
    const style = document.createElement('style')
    style.id = 'show-wubook-widget-style'
    style.innerHTML = `
      [id^="root_${widgetId}"] {
        display: block !important;
        position: relative !important;
        width: 100% !important;
      }
    `
    document.head.appendChild(style)

    // Intentar mover inmediatamente (por si ya existe)
    if (moveWidget()) {
      return () => {
        const styleTag = document.getElementById('show-wubook-widget-style')
        if (styleTag) document.head.removeChild(styleTag)
      }
    }

    // Si no existe aún, observar el DOM hasta que aparezca
    const observer = new MutationObserver((mutations) => {
      if (moveWidget()) {
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Cleanup
    return () => {
      observer.disconnect()
      const styleTag = document.getElementById('show-wubook-widget-style')
      if (styleTag) document.head.removeChild(styleTag)
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-12 lg:py-16 bg-white dark:bg-surface"
    >
      <div className="container mx-auto px-6">
        <div
          className={`text-center mb-8 transition-all duration-700 ease-out ${
            sectionInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading font-light text-2xl lg:text-3xl text-text-primary dark:text-white mb-3">
            {t('booking.title')}
          </h2>
          <div className="w-12 h-px bg-accent mx-auto" />
        </div>
        
        <div 
          ref={containerRef}
          className="max-w-4xl mx-auto"
        />
      </div>
    </section>
  )
}

export default BookingWidget