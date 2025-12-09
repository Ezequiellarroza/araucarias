/**
 * Data index - Hotel Araucarias
 * 
 * Exporta todos los datos de forma centralizada
 * 
 * Uso:
 * import { suites, services, contact } from '../data'
 * import { getSuiteBySlug, getFeaturedServices } from '../data'
 */

// Suites
export { 
  default as suites,
  AMENITIES,
  SUITE_TYPES,
  getSuiteBySlug,
  getSuiteById,
  getSuitesByType,
  getFeaturedSuites,
  formatPrice,
  getPriceRange,
} from './suites'

// Services
export {
  default as services,
  SERVICE_CATEGORIES,
  getServiceById,
  getServicesByCategory,
  getFeaturedServices,
  getIncludedServices,
  getPaidServices,
  getServicesGroupedByCategory,
} from './services'

// Gallery
export {
  default as galleryImages,
  GALLERY_CATEGORIES,
  getImageById,
  getImagesByCategory,
  getFeaturedImages,
  getImagesByAspectRatio,
  getNextImage,
  getPrevImage,
  getImageIndex,
  getTotalImages,
} from './gallery'

// Contact
export {
  default as contact,
  getWhatsAppLink,
  getPhoneLink,
  getEmailLink,
  getFullAddress,
} from './contact'