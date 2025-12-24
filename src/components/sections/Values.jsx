import { useTranslation } from 'react-i18next'
import { Sofa, Waves, Wifi } from 'lucide-react'
import useInView from '../../hooks/useInView'

const values = [
  {
    key: 'comfort',
    icon: Sofa
  },
  {
    key: 'amenities',
    icon: Waves  
  },
  {
    key: 'wifi',
    icon: Wifi
  }
]

function ValueCard({ value, index }) {
  const { t } = useTranslation()
  const [ref, isInView] = useInView({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-surface p-8 lg:p-10 text-center rounded-xl shadow-sm transition-all duration-700 ease-out ${
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Icono */}
      <div className="inline-flex items-center justify-center w-14 h-14 mb-6 text-accent">
        <value.icon className="w-8 h-8" strokeWidth={1.5} />
      </div>

      {/* Título */}
      <h3 className="font-heading font-medium text-xl lg:text-2xl text-text-primary dark:text-white mb-3">
        {t(`home.values.${value.key}`)}
      </h3>

      {/* Línea decorativa */}
      <div className="w-10 h-px bg-accent mx-auto mb-4" />

      {/* Descripción */}
      <p className="text-text-secondary leading-relaxed">
        {t(`home.values.${value.key}Desc`)}
      </p>
    </div>
  )
}

function Values() {
  return (
    <section className="py-20 lg:py-28 bg-base">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <ValueCard key={value.key} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Values