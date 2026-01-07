import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import useInView from '../hooks/useInView'
import { asset } from '../utils/assets'
import contact from '../data/contact'

const SOURCE_OPTIONS = [
  { value: '', labelKey: 'location.form.sourcePlaceholder' },
  { value: 'instagram', labelKey: 'location.form.sources.instagram' },
  { value: 'recommendation', labelKey: 'location.form.sources.recommendation' },
  { value: 'google', labelKey: 'location.form.sources.google' },
  { value: 'portal', labelKey: 'location.form.sources.portal' },
  { value: 'other', labelKey: 'location.form.sources.other' },
]

function ContactForm() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    source: '',
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          source: '',
        })
      } else {
        setStatus('error')
        setErrorMessage(result.message || t('location.form.errorGeneric'))
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(t('location.form.errorGeneric'))
    }
  }

  const inputClasses = "w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors text-text-primary dark:text-white placeholder:text-text-secondary/60"

  if (status === 'success') {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="font-heading font-medium text-xl text-text-primary dark:text-white mb-2">
          {t('location.form.successTitle')}
        </h3>
        <p className="text-text-secondary">
          {t('location.form.successMessage')}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-accent hover:text-accent-hover transition-colors font-medium"
        >
          {t('location.form.sendAnother')}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-primary dark:text-white mb-1.5">
          {t('location.form.name')} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputClasses}
          placeholder={t('location.form.namePlaceholder')}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary dark:text-white mb-1.5">
          {t('location.form.email')} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClasses}
          placeholder={t('location.form.emailPlaceholder')}
        />
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text-primary dark:text-white mb-1.5">
          {t('location.form.phone')} *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className={inputClasses}
          placeholder={t('location.form.phonePlaceholder')}
        />
      </div>

      {/* Cómo nos conociste */}
      <div>
        <label htmlFor="source" className="block text-sm font-medium text-text-primary dark:text-white mb-1.5">
          {t('location.form.source')}
        </label>
        <select
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          className={inputClasses}
        >
          {SOURCE_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {t(option.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-primary dark:text-white mb-1.5">
          {t('location.form.message')} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className={`${inputClasses} resize-none`}
          placeholder={t('location.form.messagePlaceholder')}
        />
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{errorMessage}</span>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:bg-accent/70 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t('location.form.sending')}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {t('location.form.submit')}
          </>
        )}
      </button>
    </form>
  )
}

function Location() {
  const { t } = useTranslation()
  const [imageRef, imageInView] = useInView({ threshold: 0.2 })
  const [contentRef, contentInView] = useInView({ threshold: 0.1 })

  return (
    <section className="min-h-screen bg-base">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Imagen vertical - izquierda */}
        <div
          ref={imageRef}
          className={`relative h-[50vh] lg:h-auto lg:sticky lg:top-0 transition-all duration-700 ease-out ${
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
          className={`flex flex-col py-12 lg:py-20 px-6 lg:px-16 transition-all duration-700 ease-out delay-150 ${
            contentInView
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-8'
          }`}
        >
          {/* Título y subtítulo */}
          <div className="mb-8 mt-6">
            <h1 className="font-heading font-light text-3xl lg:text-4xl text-text-primary dark:text-white mb-3">
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

          {/* Datos de contacto */}
          <div className="bg-white dark:bg-surface rounded-xl shadow-sm p-6 lg:p-8 mb-8">
            <h2 className="font-heading font-medium text-xl text-text-primary dark:text-white mb-6">
              {t('location.contactInfo')}
            </h2>
            
            <div className="space-y-4">
              {/* Teléfono */}
              <a
                href={`tel:${contact.phone.mainClean}`}
                className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">{t('location.phone')}</p>
                  <p className="text-text-primary dark:text-white">{contact.phone.main}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${contact.email.reservations}`}
                className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">{t('location.email')}</p>
                  <p className="text-text-primary dark:text-white">{contact.email.reservations}</p>
                </div>
              </a>

              {/* Dirección */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">{t('location.address')}</p>
                  <p className="text-text-primary dark:text-white">{contact.address.full}</p>
                </div>
              </div>

              {/* Botón Google Maps */}
              <a
                href="https://maps.app.goo.gl/PEjXZ2vDPbN63sqw7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-text-primary dark:text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <MapPin className="w-5 h-5" />
                {t('location.openMaps')}
              </a>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white dark:bg-surface rounded-xl shadow-sm p-6 lg:p-8">
            <h2 className="font-heading font-medium text-xl text-text-primary dark:text-white mb-6">
              {t('location.form.title')}
            </h2>
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Location