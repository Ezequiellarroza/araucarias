import { useTranslation } from 'react-i18next'
import { MessageCircle } from 'lucide-react'
import useInView from '../../hooks/useInView'
import Button from '../ui/Button'
import { contact } from '../../data/contact'

function FinalCTA() {
  const { t } = useTranslation()
  const [ref, isInView] = useInView({ threshold: 0.2 })

  const whatsappMessage = encodeURIComponent(t('whatsapp.defaultMessage'))
  const whatsappUrl = `https://wa.me/${contact.whatsapp.number}?text=${whatsappMessage}`

  return (
    <section className="py-20 lg:py-28 bg-accent">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ease-out ${
            isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Título */}
          <h2 className="font-heading font-light text-3xl lg:text-4xl text-white mb-4">
            {t('home.cta.title')}
          </h2>

          {/* Línea decorativa */}
          <div className="w-16 h-px bg-white/50 mx-auto mb-6" />

          {/* Subtítulo */}
          <p className="text-white/90 text-lg mb-8">
            {t('home.cta.subtitle')}
          </p>

          {/* CTA Primario */}
          <Button
            to="/reservas"
            variant="secondary"
            className="bg-white text-accent hover:bg-white/90 mb-6"
          >
            {t('home.cta.button')}
          </Button>

          {/* CTA Secundario - WhatsApp */}
          <div>
            
              <a href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t('home.cta.contact')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA