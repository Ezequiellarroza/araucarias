/**
 * Datos de galería - Araucarias Apartamentos
 */

// Categorías de galería
export const GALLERY_CATEGORIES = {
  ALL: 'all',
  UNIDADES: 'unidades',
  HABITACIONES: 'habitaciones',
  EDIFICIO: 'edificio',
}

// Labels para los filtros (se traducen en el componente)
export const CATEGORY_LABELS = {
  all: 'all',
  unidades: 'unidades',
  habitaciones: 'habitaciones',
  edificio: 'edificio',
}

/**
 * Lista de imágenes
 */
export const galleryImages = [
  // === EDIFICIO - Landscape (4) ===
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `edificio-${String(i + 1).padStart(3, '0')}-landscape`,
    src: `/images/gallery/edificio/edificio-${String(i + 1).padStart(3, '0')}-landscape.webp`,
    alt: `Edificio Araucarias - Vista ${i + 1}`,
    category: GALLERY_CATEGORIES.EDIFICIO,
    aspectRatio: 'landscape',
  })),

  // === EDIFICIO - Portrait (10) ===
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `edificio-${String(i + 1).padStart(3, '0')}-portrait`,
    src: `/images/gallery/edificio/edificio-${String(i + 1).padStart(3, '0')}-portrait.webp`,
    alt: `Edificio Araucarias - Vista ${i + 1}`,
    category: GALLERY_CATEGORIES.EDIFICIO,
    aspectRatio: 'portrait',
  })),

  // === HABITACIONES - Landscape (8) ===
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `habitacion-${String(i + 1).padStart(3, '0')}-landscape`,
    src: `/images/gallery/habitacion/habitacion-${String(i + 1).padStart(3, '0')}-landscape.webp`,
    alt: `Habitación Araucarias - Vista ${i + 1}`,
    category: GALLERY_CATEGORIES.HABITACIONES,
    aspectRatio: 'landscape',
  })),

  // === UNIDADES - Landscape (11) ===
  ...Array.from({ length: 11 }, (_, i) => ({
    id: `unidades-${String(i + 1).padStart(3, '0')}-landscape`,
    src: `/images/gallery/unidades/unidades-${String(i + 1).padStart(3, '0')}-landscape.webp`,
    alt: `Unidad Araucarias - Vista ${i + 1}`,
    category: GALLERY_CATEGORIES.UNIDADES,
    aspectRatio: 'landscape',
  })),

  // === UNIDADES - Portrait (9) ===
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `unidades-${String(i + 1).padStart(3, '0')}-portrait`,
    src: `/images/gallery/unidades/unidades-${String(i + 1).padStart(3, '0')}-portrait.webp`,
    alt: `Unidad Araucarias - Vista ${i + 1}`,
    category: GALLERY_CATEGORIES.UNIDADES,
    aspectRatio: 'portrait',
  })),
]

/**
 * Helpers
 */

export function getImageById(id) {
  return galleryImages.find(img => img.id === id) || null
}

export function getImagesByCategory(category) {
  if (!category || category === GALLERY_CATEGORIES.ALL) {
    return galleryImages
  }
  return galleryImages.filter(img => img.category === category)
}

export function getNextImage(currentId) {
  const currentIndex = galleryImages.findIndex(img => img.id === currentId)
  if (currentIndex === -1 || currentIndex === galleryImages.length - 1) {
    return galleryImages[0]
  }
  return galleryImages[currentIndex + 1]
}

export function getPrevImage(currentId) {
  const currentIndex = galleryImages.findIndex(img => img.id === currentId)
  if (currentIndex === -1 || currentIndex === 0) {
    return galleryImages[galleryImages.length - 1]
  }
  return galleryImages[currentIndex - 1]
}

export function getImageIndex(id) {
  return galleryImages.findIndex(img => img.id === id) + 1
}

export function getTotalImages() {
  return galleryImages.length
}

export default galleryImages