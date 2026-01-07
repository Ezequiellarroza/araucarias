import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

function Reservations() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const nebRef = useRef(null)

  useEffect(() => {
    // Esperar a que el script de WuBook esté disponible
    const initIframe = () => {
      if (typeof window.ZakNebIframe !== 'undefined' && containerRef.current && !nebRef.current) {
        const url = 'https://wubook.net/nneb/bk?f=today&n=1&ep=75436910&o=1.0.0.0'
        const target = '#wubook-reservations-iframe'
        
        nebRef.current = new window.ZakNebIframe(target, url)
        nebRef.current.render()
      }
    }

    // Intentar inicializar inmediatamente
    initIframe()
    
    // Si no está listo, reintentar
    const timer = setTimeout(initIframe, 500)
    const timer2 = setTimeout(initIframe, 1500)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <section className="min-h-screen bg-base pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading font-light text-3xl lg:text-4xl text-text-primary dark:text-white mb-3">
            {t('reservations.pageTitle')}
          </h1>
          <div className="w-16 h-px bg-accent mx-auto mb-4" />
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            {t('reservations.pageSubtitle')}
          </p>
        </div>

        {/* Contenedor del iframe de WuBook */}
        <div 
          ref={containerRef}
          id="wubook-reservations-iframe"
          className="w-full min-h-[600px]"
        />
      </div>
    </section>
  )
}

export default Reservations