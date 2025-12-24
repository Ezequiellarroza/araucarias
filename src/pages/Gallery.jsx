import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { 
  galleryImages, 
  getImagesByCategory, 
  getNextImage, 
  getPrevImage,
  getImageIndex,
  getTotalImages,
  GALLERY_CATEGORIES 
} from '../data/gallery'
import { asset } from '../utils/assets'

function Gallery() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState(GALLERY_CATEGORIES.ALL)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [filteredImages, setFilteredImages] = useState(galleryImages)

  // Filtrar imágenes cuando cambia el filtro
  useEffect(() => {
    setFilteredImages(getImagesByCategory(activeFilter))
  }, [activeFilter])

  // Navegación del lightbox con teclado
  useEffect(() => {
    if (!lightboxImage) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null)
      if (e.key === 'ArrowRight') setLightboxImage(getNextImage(lightboxImage.id))
      if (e.key === 'ArrowLeft') setLightboxImage(getPrevImage(lightboxImage.id))
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [lightboxImage])

  const filters = [
    { key: GALLERY_CATEGORIES.ALL, label: t('gallery.filters.all') },
    { key: GALLERY_CATEGORIES.UNIDADES, label: t('gallery.filters.unidades') },
    { key: GALLERY_CATEGORIES.HABITACIONES, label: t('gallery.filters.habitaciones') },
    { key: GALLERY_CATEGORIES.EDIFICIO, label: t('gallery.filters.edificio') },
  ]

  return (
    <section className="min-h-screen bg-base py-20 lg:py-28">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-light text-3xl lg:text-4xl text-text-primary mb-4">
            {t('gallery.title')}
          </h1>
          <div className="w-16 h-px bg-accent mx-auto" />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-accent text-white'
                  : 'bg-white dark:bg-surface text-text-secondary hover:text-accent shadow-sm'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => setLightboxImage(image)}
              className="break-inside-avoid cursor-pointer group overflow-hidden rounded-xl"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={asset(image.src)}
                  alt={image.alt}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    image.aspectRatio === 'portrait' 
                      ? 'aspect-[2/3]' 
                      : image.aspectRatio === 'square'
                        ? 'aspect-square'
                        : 'aspect-[3/2]'
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxImage(null)}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
            aria-label={t('gallery.lightbox.close')}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navegación anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxImage(getPrevImage(lightboxImage.id))
            }}
            className="absolute left-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
            aria-label={t('gallery.lightbox.prev')}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Imagen */}
          <img
            src={asset(lightboxImage.src)}
            alt={lightboxImage.alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navegación siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxImage(getNextImage(lightboxImage.id))
            }}
            className="absolute right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
            aria-label={t('gallery.lightbox.next')}
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Contador */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {getImageIndex(lightboxImage.id)} / {getTotalImages()}
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery