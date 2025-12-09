import { useTranslation } from 'react-i18next'
import useInView from '../../hooks/useInView'
import Button from '../ui/Button'
import { asset } from '../../utils/assets'

function Intro() {
  const { t } = useTranslation()
  const [ref, isInView] = useInView({ threshold: 0.2 })

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo con parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${asset('images/intro/intro-bg-desktop.webp')}')` }}
      />

      {/* Overlay oscuro para contraste */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenido */}
      <div className="relative container mx-auto px-6 py-20">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto text-center p-10 lg:p-14 rounded-neu transition-all duration-700 ease-out ${
            isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Título */}
          <h2 className="font-heading font-light text-3xl lg:text-4xl text-white mb-4">
            {t('home.intro.title')}
          </h2>

          {/* Línea decorativa */}
          <div className="w-16 h-px bg-accent mx-auto mb-6" />

          {/* Descripción */}
          <p className="font-body text-white/90 leading-relaxed mb-8">
            {t('home.intro.description')}
          </p>

          {/* CTA */}
          <Button to="/suites" variant="primary">
            {t('home.intro.cta')}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Intro