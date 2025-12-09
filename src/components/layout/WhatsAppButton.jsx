import { MessageCircle } from 'lucide-react'

function WhatsAppButton({ phoneNumber = '5491112345678', message = 'Hola! Me gustaría hacer una consulta.' }) {
  // Formatear URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    
    <a  href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14
        flex items-center justify-center
        bg-[#25D366] text-white
        rounded-full
        shadow-lg shadow-[#25D366]/30
        hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40
        active:scale-95
        transition-all duration-300
        animate-pulse-subtle
      "
    >
      <MessageCircle className="w-7 h-7" />
      
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </a>
  )
}

export default WhatsAppButton