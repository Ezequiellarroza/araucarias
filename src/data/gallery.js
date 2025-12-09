/**
 * Datos de galería - Hotel Araucarias
 * 
 * Estructura para las imágenes de la galería
 * Las imágenes reales se agregarán cuando el cliente las provea
 */

// Categorías de galería
export const GALLERY_CATEGORIES = {
  ALL: 'all',
  SUITES: 'suites',
  COMMON: 'common',
  BUILDING: 'building',
  DETAILS: 'details',
}

/**
 * Lista de imágenes
 * 
 * Notas:
 * - src: ruta a la imagen
 * - alt: descripción para accesibilidad (traducir en componente)
 * - category: para filtrar
 * - featured: mostrar primero / en home
 * - aspectRatio: para layout masonry ('landscape' | 'portrait' | 'square')
 */
export const galleryImages = [
  // === EDIFICIO ===
  {
    id: 'building-aerial',
    src: '/images/gallery/edificio-aereo.jpg',
    alt: 'Vista aérea del edificio Hotel Araucarias',
    category: GALLERY_CATEGORIES.BUILDING,
    featured: true,
    aspectRatio: 'portrait',
  },
  {
    id: 'building-facade',
    src: '/images/gallery/edificio-fachada.jpg',
    alt: 'Fachada del Hotel Araucarias',
    category: GALLERY_CATEGORIES.BUILDING,
    featured: false,
    aspectRatio: 'landscape',
  },
  {
    id: 'building-entrance',
    src: '/images/gallery/edificio-entrada.jpg',
    alt: 'Entrada principal del hotel',
    category: GALLERY_CATEGORIES.BUILDING,
    featured: false,
    aspectRatio: 'landscape',
  },

  // === SUITES ===
  {
    id: 'suite-living-1',
    src: '/images/gallery/suite-living-1.jpg',
    alt: 'Living comedor de suite con diseño contemporáneo',
    category: GALLERY_CATEGORIES.SUITES,
    featured: true,
    aspectRatio: 'landscape',
  },
  {
    id: 'suite-living-2',
    src: '/images/gallery/suite-living-2.jpg',
    alt: 'Espacio integrado living comedor cocina',
    category: GALLERY_CATEGORIES.SUITES,
    featured: true,
    aspectRatio: 'landscape',
  },
  {
    id: 'suite-kitchen',
    src: '/images/gallery/suite-cocina.jpg',
    alt: 'Cocina completa equipada',
    category: GALLERY_CATEGORIES.SUITES,
    featured: false,
    aspectRatio: 'landscape',
  },
  {
    id: 'suite-bedroom',
    src: '/images/gallery/suite-dormitorio.jpg',
    alt: 'Dormitorio con cama y luz natural',
    category: GALLERY_CATEGORIES.SUITES,
    featured: false,
    aspectRatio: 'landscape',
  },
  {
    id: 'suite-bathroom',
    src: '/images/gallery/suite-bano.jpg',
    alt: 'Baño moderno con mampara de vidrio',
    category: GALLERY_CATEGORIES.SUITES,
    featured: true,
    aspectRatio: 'portrait',
  },

  // === ÁREAS COMUNES ===
  {
    id: 'common-lobby',
    src: '/images/gallery/lobby.jpg',
    alt: 'Lobby del hotel',
    category: GALLERY_CATEGORIES.COMMON,
    featured: false,
    aspectRatio: 'landscape',
  },
  {
    id: 'common-hallway',
    src: '/images/gallery/pasillo.jpg',
    alt: 'Pasillo del edificio',
    category: GALLERY_CATEGORIES.COMMON,
    featured: false,
    aspectRatio: 'portrait',
  },

  // === DETALLES ===
  {
    id: 'detail-concrete',
    src: '/images/gallery/detalle-hormigon.jpg',
    alt: 'Detalle de techo de hormigón visto',
    category: GALLERY_CATEGORIES.DETAILS,
    featured: false,
    aspectRatio: 'square',
  },
  {
    id: 'detail-wood',
    src: '/images/gallery/detalle-madera.jpg',
    alt: 'Panel de madera con listones verticales',
    category: GALLERY_CATEGORIES.DETAILS,
    featured: false,
    aspectRatio: 'square',
  },
  {
    id: 'detail-mirror',
    src: '/images/gallery/detalle-espejo.jpg',
    alt: 'Espejo retroiluminado del baño',
    category: GALLERY_CATEGORIES.DETAILS,
    featured: false,
    aspectRatio: 'portrait',
  },
  {
    id: 'detail-furniture',
    src: '/images/gallery/detalle-muebles.jpg',
    alt: 'Mobiliario de diseño',
    category: GALLERY_CATEGORIES.DETAILS,
    featured: false,
    aspectRatio: 'landscape',
  },
]

/**
 * Helpers
 */

// Obtener imagen por ID
export function getImageById(id) {
  return galleryImages.find(img => img.id === id) || null
}

// Filtrar imágenes por categoría
export function getImagesByCategory(category) {
  if (!category || category === GALLERY_CATEGORIES.ALL) {
    return galleryImages
  }
  return galleryImages.filter(img => img.category === category)
}

// Obtener imágenes destacadas
export function getFeaturedImages() {
  return galleryImages.filter(img => img.featured)
}

// Obtener imágenes por aspect ratio (para layouts)
export function getImagesByAspectRatio(ratio) {
  return galleryImages.filter(img => img.aspectRatio === ratio)
}

// Obtener siguiente imagen (para lightbox)
export function getNextImage(currentId) {
  const currentIndex = galleryImages.findIndex(img => img.id === currentId)
  if (currentIndex === -1 || currentIndex === galleryImages.length - 1) {
    return galleryImages[0]
  }
  return galleryImages[currentIndex + 1]
}

// Obtener imagen anterior (para lightbox)
export function getPrevImage(currentId) {
  const currentIndex = galleryImages.findIndex(img => img.id === currentId)
  if (currentIndex === -1 || currentIndex === 0) {
    return galleryImages[galleryImages.length - 1]
  }
  return galleryImages[currentIndex - 1]
}

// Obtener índice de imagen (para contador)
export function getImageIndex(id) {
  return galleryImages.findIndex(img => img.id === id) + 1
}

// Total de imágenes
export function getTotalImages() {
  return galleryImages.length
}

export default galleryImages