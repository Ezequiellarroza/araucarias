/**
 * Datos de servicios - Araucarias Apartamentos
 * 
 * Basado en Fact Sheet del cliente
 * Las traducciones están en i18n (services.list.[key])
 */

// Categorías de servicios
export const SERVICE_CATEGORIES = {
  SUITES: 'suites',
  BUILDING: 'building',
  CONVENIENCE: 'convenience',
}

/**
 * Lista de servicios
 */
export const services = [
  // === EN TU UNIDAD ===
  {
    id: 'kitchen',
    i18nKey: 'kitchen',
    icon: 'ChefHat',
    category: SERVICE_CATEGORIES.SUITES,
    featured: true,
    included: true,
    order: 1,
  },
  {
    id: 'wifi',
    i18nKey: 'wifi',
    icon: 'Wifi',
    category: SERVICE_CATEGORIES.SUITES,
    featured: true,
    included: true,
    order: 2,
  },
  {
    id: 'ac',
    i18nKey: 'ac',
    icon: 'AirVent',
    category: SERVICE_CATEGORIES.SUITES,
    featured: true,
    included: true,
    order: 3,
  },
  {
    id: 'smart-tv',
    i18nKey: 'smartTv',
    icon: 'Tv',
    category: SERVICE_CATEGORIES.SUITES,
    featured: false,
    included: true,
    order: 4,
  },
  {
    id: 'linens',
    i18nKey: 'linens',
    icon: 'Bed',
    category: SERVICE_CATEGORIES.SUITES,
    featured: false,
    included: true,
    order: 5,
  },
  {
    id: 'intercom',
    i18nKey: 'intercom',
    icon: 'Phone',
    category: SERVICE_CATEGORIES.SUITES,
    featured: false,
    included: true,
    order: 6,
  },

  // === EN EL EDIFICIO ===
  {
    id: 'pool',
    i18nKey: 'pool',
    icon: 'Waves',
    category: SERVICE_CATEGORIES.BUILDING,
    featured: true,
    included: true,
    order: 7,
  },
  {
    id: 'gym',
    i18nKey: 'gym',
    icon: 'Dumbbell',
    category: SERVICE_CATEGORIES.BUILDING,
    featured: true,
    included: true,
    order: 8,
  },
  {
    id: 'solarium',
    i18nKey: 'solarium',
    icon: 'Sun',
    category: SERVICE_CATEGORIES.BUILDING,
    featured: false,
    included: true,
    order: 9,
  },
  {
    id: 'cowork',
    i18nKey: 'cowork',
    icon: 'Laptop',
    category: SERVICE_CATEGORIES.BUILDING,
    featured: true,
    included: true,
    order: 10,
  },
  {
    id: 'grill',
    i18nKey: 'grill',
    icon: 'Flame',
    category: SERVICE_CATEGORIES.BUILDING,
    featured: false,
    included: true,
    order: 11,
  },
  {
    id: 'parking',
    i18nKey: 'parking',
    icon: 'Car',
    category: SERVICE_CATEGORIES.BUILDING,
    featured: false,
    included: true,
    order: 12,
  },
  {
    id: 'security',
    i18nKey: 'security',
    icon: 'Shield',
    category: SERVICE_CATEGORIES.BUILDING,
    featured: false,
    included: true,
    order: 13,
  },

  // === SERVICIOS ADICIONALES ===
  {
    id: 'cleaning',
    i18nKey: 'cleaning',
    icon: 'Sparkles',
    category: SERVICE_CATEGORIES.CONVENIENCE,
    featured: false,
    included: true, // Semanal incluido
    order: 14,
  },
  {
    id: 'extra-cleaning',
    i18nKey: 'extraCleaning',
    icon: 'SprayCan',
    category: SERVICE_CATEGORIES.CONVENIENCE,
    featured: false,
    included: false, // Bajo demanda con cargo
    order: 15,
  },
]

/**
 * Helpers
 */

export function getServiceById(id) {
  return services.find(service => service.id === id) || null
}

export function getServicesByCategory(category) {
  if (!category || category === 'all') {
    return services.sort((a, b) => a.order - b.order)
  }
  return services
    .filter(service => service.category === category)
    .sort((a, b) => a.order - b.order)
}

export function getFeaturedServices() {
  return services
    .filter(service => service.featured)
    .sort((a, b) => a.order - b.order)
}

export function getIncludedServices() {
  return services
    .filter(service => service.included)
    .sort((a, b) => a.order - b.order)
}

export function getPaidServices() {
  return services
    .filter(service => !service.included)
    .sort((a, b) => a.order - b.order)
}

export function getServicesGroupedByCategory() {
  return Object.values(SERVICE_CATEGORIES).map(category => ({
    category,
    i18nKey: `services.categories.${category}`,
    services: getServicesByCategory(category),
  }))
}

export default services