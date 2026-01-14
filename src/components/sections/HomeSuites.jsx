import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import useInView from '../../hooks/useInView'
import Button from '../ui/Button'
import { getAvailableSuites, AMENITIES } from '../../data/suites'
import { asset } from '../../utils/assets'

function SuiteCard({ suite, index }) {
  const { t } = useTranslation()
  const [ref, isInView] = useInView({ threshold: 0.1 })

  // Determinar texto de capacidad
  const capacityText = suite.capacity.customText
    ? t(`suites.capacity.${suite.i18nKey}`)
    : `${suite.capacity.guests} ${t('suites.guests')}`

  return (
    <Link
      to="/habitaciones"
      ref={ref}
      className={`group block bg-white dark:bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-700 ease-out ${
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={asset(suite.images[0])}
          alt={t(`suites.types.${suite.i18nKey}.name`)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay en hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Contenido */}
      <div className="p-5 lg:p-6">
        {/* Nombre */}
        <h3 className="font-heading font-medium text-lg lg:text-xl text-text-primary dark:text-white mb-2 group-hover:text-accent transition-colors">
          {t(`suites.types.${suite.i18nKey}.name`)}
        </h3>

        {/* Descripción corta */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {t(`suites.types.${suite.i18nKey}.shortDesc`)}
        </p>

        {/* Info */}
        <div className="flex items-center justify-between">
          {/* Capacidad */}
          <div className="flex items-center gap-1.5 text-text-secondary">
            <Users className="w-4 h-4" />
            <span className="text-sm">{capacityText}</span>
          </div>

          {/* Ver más */}
          <span className="text-sm font-medium text-accent group-hover:text-accent-hover transition-colors">
            {t('common.viewMore')}
          </span>
        </div>
      </div>
    </Link>
  )
}

function HomeSuites() {
  const { t } = useTranslation()
  const [headerRef, headerInView] = useInView({ threshold: 0.2 })
  const availableSuites = getAvailableSuites()

  return (
    <section className="py-20 lg:py-28 bg-base">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 lg:mb-16 transition-all duration-700 ease-out ${
            headerInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading font-light text-3xl lg:text-4xl text-text-primary dark:text-white mb-4">
            {t('home.suites.title')}
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mb-4" />
          <p className="text-text-secondary max-w-xl mx-auto">
            {t('home.suites.subtitle')}
          </p>
        </div>

        {/* Grid de unidades - 2 columnas centradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
          {availableSuites.map((suite, index) => (
            <SuiteCard key={suite.id} suite={suite} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button to="/reservas" variant="primary">
            {t('home.suites.cta')}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HomeSuites