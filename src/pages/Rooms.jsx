import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  Users, 
  BedDouble, 
  Bath, 
  ChefHat, 
  Wifi, 
  AirVent, 
  Tv, 
  Bed, 
  DoorOpen, 
  Trees, 
  Sofa, 
  Phone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import useInView from '../hooks/useInView'
import Button from '../components/ui/Button'
import { suites, AMENITIES } from '../data/suites'
import { asset } from '../utils/assets'

// Mapeo de iconos
const iconMap = {
  ChefHat,
  Wifi,
  AirVent,
  Tv,
  Bed,
  DoorOpen,
  Trees,
  Sofa,
  Phone,
  Bath,
}

function ImageSlider({ images, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative h-full min-h-[50vh] lg:min-h-[70vh] overflow-hidden">
      {/* Imágenes */}
      {images.map((image, index) => (
        <img
          key={index}
          src={asset(image)}
          alt={`${alt} ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Controles */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function SuiteSection({ suite, index }) {
  const { t } = useTranslation()
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const isReversed = index % 2 !== 0

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-10 min-h-[70vh] transition-all duration-700 ease-out ${
        isInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Imagen - 70% */}
      <div 
        className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'} ${
          isInView 
            ? 'translate-x-0' 
            : isReversed ? 'translate-x-8' : '-translate-x-8'
        } transition-transform duration-700 ease-out`}
      >
        <ImageSlider 
          images={suite.images} 
          alt={t(`suites.types.${suite.i18nKey}.name`)} 
        />
      </div>

      {/* Contenido - 30% */}
      <div 
        className={`lg:col-span-3 ${isReversed ? 'lg:order-1' : 'lg:order-2'} bg-white dark:bg-surface flex items-center ${
          isInView 
            ? 'translate-x-0' 
            : isReversed ? '-translate-x-8' : 'translate-x-8'
        } transition-transform duration-700 ease-out delay-150`}
      >
        <div className="p-6 lg:p-10 w-full">
          {/* Título y descripción */}
          <h2 className="font-heading font-light text-2xl lg:text-3xl text-text-primary dark:text-white mb-3">
            {t(`suites.types.${suite.i18nKey}.name`)}
          </h2>
          <div className="w-12 h-px bg-accent mb-4" />
          <p className="text-text-secondary text-sm lg:text-[1rem] mb-6 leading-relaxed">
            {t(`suites.types.${suite.i18nKey}.description`)}
          </p>

          {/* Badges de capacidad */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/10 rounded-full">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-sm text-text-primary dark:text-white">{suite.capacity.guests}</span>
            </div>
            {suite.capacity.bedrooms > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/10 rounded-full">
                <BedDouble className="w-4 h-4 text-accent" />
                <span className="text-sm text-text-primary dark:text-white">{suite.capacity.bedrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/10 rounded-full">
              <Bath className="w-4 h-4 text-accent" />
              <span className="text-sm text-text-primary dark:text-white">
                {suite.capacity.bathrooms}{suite.capacity.toilette ? ` + ${suite.capacity.toilette} toilette` : ''}
              </span>
            </div>
          </div>

          {/* Configuración de camas */}
          <div className="flex items-start gap-2 mb-6 pb-6 border-b border-gray-100 dark:border-white/10">
            <BedDouble className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
            <span className="text-sm text-text-secondary">{suite.bedSize}</span>
          </div>

          {/* Grid de amenities */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {suite.amenities.slice(0, 8).map((amenityKey) => {
              const amenity = AMENITIES[amenityKey]
              if (!amenity) return null
              const IconComponent = iconMap[amenity.icon]
              return (
                <div 
                  key={amenityKey}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  title={t(amenity.i18nKey)}
                >
                  {IconComponent && <IconComponent className="w-5 h-5 text-accent" />}
                  <span className="text-[10px] text-text-secondary text-center line-clamp-1">
                    {t(amenity.i18nKey)}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Botón CTA */}
          <Button to="/reservas" variant="primary" className="w-full justify-center">
            {t('suites.checkAvailability')}
          </Button>
        </div>
      </div>
    </div>
  )
}

function Rooms() {
  const { t } = useTranslation()
  const [headerRef, headerInView] = useInView({ threshold: 0.2 })

  return (
    <section className="min-h-screen bg-base">
      {/* Header */}
      <div className="pt-32 pb-12 lg:pb-16">
        <div className="container mx-auto px-6">
          <div
            ref={headerRef}
            className={`text-center transition-all duration-700 ease-out ${
              headerInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="font-heading font-light text-4xl lg:text-5xl text-text-primary dark:text-white mb-4">
              {t('suites.pageTitle')}
            </h1>
            <div className="w-16 h-px bg-accent mx-auto mb-4" />
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              {t('suites.pageSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Secciones de habitaciones */}
      <div className="pb-20 lg:pb-0">
        {suites.map((suite, index) => (
          <SuiteSection key={suite.id} suite={suite} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Rooms