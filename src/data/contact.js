/**
 * Datos de contacto - Araucarias Apartamentos
 */

export const contact = {
  // Nombre oficial
  name: 'Araucarias Apartamentos',
  legalName: 'VIEW Desarrollos S.A.',
  
  // Ubicación
  address: {
    street: 'Córdoba 2833',
    city: 'Moreno',
    province: 'Buenos Aires',
    country: 'Argentina',
    postalCode: 'B1744',
    full: 'Córdoba 2833, Moreno, Buenos Aires, Argentina',
  },
  
  // Coordenadas para mapa (Araucarias by VIEW Desarrollos)
  coordinates: {
    lat: -34.6467,
    lng: -58.7919,
  },
  
  // Teléfonos
  phone: {
    main: '+54 9 11 2674-5084',
    whatsapp: '+54 9 11 2674-5084',
    mainClean: '5491126745084',
    whatsappClean: '5491126745084',
  },
  
  // Email
  email: {
    reservations: 'araucarias@viewdesarrollos.com.ar',
    info: 'araucarias@viewdesarrollos.com.ar',
  },
  
  // Redes sociales
  social: {
    instagram: 'https://instagram.com/Araucarias_apartamentos',
  },
  
  // Horarios (confirmar con cliente)
  hours: {
    reception: {
      open: '08:00',
      close: '20:00',
    },
    checkIn: {
      from: '14:00',
      to: '20:00',
    },
    checkOut: {
      until: '10:00',
    },
  },
  
  // Para el botón de WhatsApp
  whatsapp: {
    number: '5491126745084',
    defaultMessage: 'Hola! Me interesa hacer una reserva en Araucarias Apartamentos. ¿Podrían darme información sobre disponibilidad?',
  },
  
  // Google Maps - Araucarias by VIEW Desarrollos
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.8!2d-58.7941!3d-34.6467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc93c0e01e31a1%3A0x5e5e5e5e5e5e5e5e!2sAraucarias%20by%20VIEW%20DESARROLLOS!5e0!3m2!1ses-419!2sar',
  googleMapsLink: 'https://maps.app.goo.gl/araucarias',
}

/**
 * Helpers
 */

export function getWhatsAppLink(customMessage = null) {
  const message = encodeURIComponent(customMessage || contact.whatsapp.defaultMessage)
  return `https://wa.me/${contact.whatsapp.number}?text=${message}`
}

export function getPhoneLink() {
  return `tel:${contact.phone.mainClean}`
}

export function getEmailLink(type = 'reservations') {
  const email = contact.email[type] || contact.email.reservations
  return `mailto:${email}`
}

export function getFullAddress() {
  const { street, city, province, country } = contact.address
  return `${street}, ${city}, ${province}, ${country}`
}

export default contact