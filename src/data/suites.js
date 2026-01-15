/**
 * Datos de las unidades - Araucarias Apartamentos
 * 
 * Basado en Fact Sheet del cliente
 * Las traducciones están en i18n (suites.types.[key])
 */

// Amenities disponibles (iconos de Lucide React)
export const AMENITIES = {
  kitchen: { icon: 'ChefHat', i18nKey: 'suites.features.kitchen' },
  wifi: { icon: 'Wifi', i18nKey: 'suites.features.wifi' },
  ac: { icon: 'AirVent', i18nKey: 'suites.features.ac' },
  tv: { icon: 'Tv', i18nKey: 'suites.features.tv' },
  linens: { icon: 'Bed', i18nKey: 'suites.features.linens' },
  closet: { icon: 'DoorOpen', i18nKey: 'suites.features.closet' },
  intercom: { icon: 'Phone', i18nKey: 'suites.features.intercom' },
  patio: { icon: 'Trees', i18nKey: 'suites.features.patio' },
  living: { icon: 'Sofa', i18nKey: 'suites.features.living' },
  toilette: { icon: 'Bath', i18nKey: 'suites.features.toilette' },
}

// Tipos de unidad
export const SUITE_TYPES = {
  CONFORT: 'confort',
  SUPERIOR: 'superior',
  EXECUTIVE: 'executive',
}

/**
 * Lista de unidades
 */
export const suites = [
  {
    id: 'confort',
    slug: 'confort',
    type: SUITE_TYPES.CONFORT,
    i18nKey: 'confort',
    price: null,
    available: true,
    capacity: {
      guests: 2,
      bedrooms: 0,
      bathrooms: 1,
    },
    bedSize: '1 cama de 2.00 x 2.00 m',
    amenities: ['kitchen', 'wifi', 'ac', 'tv', 'linens', 'intercom', 'patio'],
    featured: true,
    images: [
      'images/suites/confort/confort-001.webp',
      'images/suites/confort/confort-002.webp',
      'images/suites/confort/confort-003.webp',
      'images/suites/confort/confort-004.webp',
    ],
    highlights: ['kitchen', 'ac', 'patio'],
  },
  {
    id: 'superior',
    slug: 'superior',
    type: SUITE_TYPES.SUPERIOR,
    i18nKey: 'superior',
    price: null,
    available: true,
    capacity: {
      guests: 3,
      bedrooms: 1,
      bathrooms: 1,
      customText: true,
    },
    bedSize: '1 cama de 2.00 x 2.00 m',
    amenities: ['kitchen', 'wifi', 'ac', 'tv', 'linens', 'closet', 'intercom', 'patio'],
    featured: true,
    images: [
      'images/suites/superior/superior-001.webp',
      'images/suites/superior/superior-002.webp',
      'images/suites/superior/superior-003.webp',
      
    ],
    highlights: ['kitchen', 'closet', 'patio'],
  },
  {
    id: 'executive',
    slug: 'executive-suite',
    type: SUITE_TYPES.EXECUTIVE,
    i18nKey: 'executive',
    price: null,
    available: false, // No disponible todavía
    capacity: {
      guests: 4,
      bedrooms: 2,
      bathrooms: 1,
      toilette: 1,
    },
    bedSize: '1 cama de 2.00 x 2.00 m + 1 cama de 1.20 x 1.90 m',
    amenities: ['kitchen', 'wifi', 'ac', 'tv', 'linens', 'closet', 'intercom', 'patio', 'living', 'toilette'],
    featured: true,
    images: [
      'images/suites/executive/executive-001.webp',
      'images/suites/executive/executive-002.webp',
      'images/suites/executive/executive-003.webp',
      'images/suites/executive/executive-004.webp',
      'images/suites/executive/executive-005.webp',
      'images/suites/executive/executive-006.webp',
    ],
    highlights: ['living', 'kitchen', 'patio'],
  },
]

/**
 * Helpers
 */

export function getAvailableSuites() {
  return suites.filter(suite => suite.available)
}

export function getSuiteBySlug(slug) {
  return suites.find(suite => suite.slug === slug) || null
}

export function getSuiteById(id) {
  return suites.find(suite => suite.id === id) || null
}

export function getSuitesByType(type) {
  if (!type || type === 'all') return getAvailableSuites()
  return suites.filter(suite => suite.type === type && suite.available)
}

export function getFeaturedSuites() {
  return suites.filter(suite => suite.featured && suite.available)
}

export function formatPrice(price, locale = 'es-AR') {
  if (!price) return 'Consultar'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getPriceRange() {
  const prices = suites.filter(s => s.price && s.available).map(s => s.price)
  if (prices.length === 0) return { min: null, max: null }
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

export default suites