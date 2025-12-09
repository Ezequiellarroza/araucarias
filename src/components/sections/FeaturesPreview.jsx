import { useTranslation } from 'react-i18next'
import { ChefHat, Wifi, AirVent, Waves, Dumbbell, Laptop } from 'lucide-react'
import useInView from '../../hooks/useInView'
import Button from '../ui/Button'

const features = [
  { key: 'kitchen', icon: ChefHat },
  { key: 'wifi', icon: Wifi },
  { key: 'ac', icon: AirVent },
  { key: 'pool', icon: Waves },
  { key: 'gym', icon: Dumbbell },
  { key: 'cowork', icon: Laptop },
]

function FeatureItem({ feature, index }) {
  const { t } = useTranslation()
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ease-out ${
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icono */}
      <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 dark:bg-white/10 rounded-full text-accent">
        <feature.icon className="w-7 h-7" strokeWidth={1.5} />
      </div>

      {/* Nombre */}
      <h3 className="font-medium text-sm text-text-primary dark:text-white whitespace-nowrap">
        {t(`services.list.${feature.key}.name`)}
      </h3>
    </div>
  )
}

function FeaturesPreview() {
  const { t } = useTranslation()
  const [headerRef, headerInView] = useInView({ threshold: 0.2 })

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-surface">
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
            {t('home.features.title')}
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mb-4" />
          <p className="text-text-secondary max-w-xl mx-auto">
            {t('home.features.subtitle')}
          </p>
        </div>

        {/* Grid de features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureItem key={feature.key} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button to="/servicios" variant="primary">
            {t('home.features.cta')}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturesPreview