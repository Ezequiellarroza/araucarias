import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useInView from '../../hooks/useInView'

function BookingWidget() {
  const { t } = useTranslation()
  const [sectionRef, sectionInView] = useInView({ threshold: 0.2 })
  const containerRef = useRef(null)

  useEffect(() => {
    // Función para mover el widget al contenedor
    const moveWidget = () => {
      const widget = document.querySelector('[id^="root_f2882160-cbe6-4b91-90cb-e207e26b8d95"]')
      
      if (widget && containerRef.current && !containerRef.current.contains(widget)) {
        containerRef.current.appendChild(widget)
      }
    }

    // Crear estilo para mostrar el widget
    const style = document.createElement('style')
    style.id = 'show-wubook-widget-style'
    style.innerHTML = `
      [id^="root_f2882160-cbe6-4b91-90cb-e207e26b8d95"] {
        display: block !important;
        position: relative !important;
        width: 100% !important;
      }
    `
    document.head.appendChild(style)

    // Intentar mover el widget inmediatamente y con un pequeño delay (por si tarda en cargar)
    moveWidget()
    const timer = setTimeout(moveWidget, 500)
    const timer2 = setTimeout(moveWidget, 1500)

    // Cleanup
    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      const styleTag = document.getElementById('show-wubook-widget-style')
      if (styleTag) {
        document.head.removeChild(styleTag)
      }
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
        
        {/* Contenedor donde se moverá el widget de WuBook */}
        <div 
          ref={containerRef}
          className="max-w-4xl mx-auto"
        />
      </div>
    </section>
  )
}

export default BookingWidget