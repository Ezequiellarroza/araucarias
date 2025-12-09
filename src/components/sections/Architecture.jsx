import { useTranslation } from 'react-i18next'
import useInView from '../../hooks/useInView'
import { asset } from '../../utils/assets'

function Architecture() {
  const { t } = useTranslation()
  const [imageRef, imageInView] = useInView({ threshold: 0.2 })
  const [textRef, textInView] = useInView({ threshold: 0.2 })

  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] bg-base">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] lg:min-h-[80vh]">
        
        {/* Imagen - full bleed izquierda */}
        <div
          ref={imageRef}
          className={`relative h-[50vh] lg:h-auto transition-all duration-700 ease-out ${
            imageInView
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-8'
          }`}
        >
          <img
  src={asset('images/architecture/building.webp')}
  alt={t('home.architecture.title')}
  className="absolute inset-0 w-full h-full object-cover"
/>
        </div>

        {/* Texto - centrado con padding */}
        <div
          ref={textRef}
          className={`flex items-center py-16 lg:py-20 px-8 lg:px-16 transition-all duration-700 ease-out delay-150 ${
            textInView
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-8'
          }`}
        >
          <div className="max-w-lg">
            <h2 className="font-heading font-light text-3xl lg:text-4xl text-text-primary mb-4">
              {t('home.architecture.title')}
            </h2>
            
            <div className="w-16 h-px bg-accent mb-6" />
            
            <p className="font-body text-text-secondary leading-relaxed text-lg">
              {t('home.architecture.description')}
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Architecture