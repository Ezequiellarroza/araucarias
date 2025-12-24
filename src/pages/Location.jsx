import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin } from 'lucide-react'
import useInView from '../hooks/useInView'
import { asset } from '../utils/assets'
import contact from '../data/contact'

function Location() {
  const { t } = useTranslation()
  const [imageRef, imageInView] = useInView({ threshold: 0.2 })
  const [contentRef, contentInView] = useInView({ threshold: 0.2 })

  return (
    <section className="min-h-screen bg-base">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Imagen vertical - izquierda */}
        <div
          ref={imageRef}
          className={`relative h-[50vh] lg:h-auto transition-all duration-700 ease-out ${
            imageInView
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-8'
          }`}
        >
          <img
            src={asset('images/location/drone-exterior.webp')}
            alt={t('location.title')}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Contenido - derecha */}
        <div
          ref={contentRef}
          className={`flex flex-col justify-center py-12 lg:py-20 px-6 lg:px-16 transition-all duration-700 ease-out delay-150 ${
            contentInView
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-8'
          }`}
        >
          {/* Título y subtítulo */}
          <div className="mb-8 mt-6">
            <h1 className="font-heading font-light text-3xl lg:text-4xl text-text-primary mb-3">
              {t('location.title')}
            </h1>
            <div className="w-16 h-px bg-accent mb-4" />
            <p className="text-text-secondary text-lg">
              {t('location.subtitle')}
            </p>
          </div>

          {/* Mapa */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.6956424340688!2d-58.78647802425833!3d-34.63713087294228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9500519bea29%3A0x3f71408fcb745f5b!2sAraucarias%20by%20VIEW%20DESARROLLOS!5e0!3m2!1ses-419!2sar!4v1766491737929!5m2!1ses-419!2sar"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Araucarias Apartamentos"
            />
          </div>

          {/* Contacto */}
          <div className="bg-white dark:bg-surface rounded-xl shadow-sm p-6 lg:p-8">
            <h2 className="font-heading font-medium text-xl text-text-primary mb-6">
              {t('location.contact')}
            </h2>
            
            <div className="space-y-4">
              {/* Teléfono */}
              
             <a   href={`tel:${contact.phone.mainClean}`}
  className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors"
>
  <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
    <Phone className="w-5 h-5 text-accent" />
  </div>
  <div>
    <p className="text-sm text-text-secondary">{t('location.phone')}</p>
    <p className="text-text-primary">{contact.phone.main}</p>
  </div>
</a>
              

              {/* Email */}
              
             <a   href={`mailto:${contact.email.reservations}`}
  className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors"
>
  <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
    <Mail className="w-5 h-5 text-accent" />
  </div>
  <div>
    <p className="text-sm text-text-secondary">{t('location.email')}</p>
    <p className="text-text-primary">{contact.email.reservations}</p>
  </div>
</a>

              {/* Dirección */}
              <div className="flex items-center gap-4">
  <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
    <MapPin className="w-5 h-5 text-accent" />
  </div>
  <div>
    <p className="text-sm text-text-secondary">{t('location.address')}</p>
    <p className="text-text-primary">{contact.address.full}</p>
  </div>
</div>

{/* Botón Google Maps */}

  <a href="https://maps.app.goo.gl/PEjXZ2vDPbN63sqw7"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 px-6 rounded-lg transition-colors"
>
  <MapPin className="w-5 h-5" />
  {t('location.openMaps')}
</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Location