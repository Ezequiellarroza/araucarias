import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Instagram } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import Container from '../ui/Container'
import { contact } from '../../data/contact'
import { asset } from '../../utils/assets'

function Footer() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/habitaciones', label: t('nav.suites') },
   
    { to: '/galeria', label: t('nav.gallery') },
    { to: '/ubicacion', label: t('nav.location') },
    { to: '/reservas', label: t('nav.reservations') },
  ]

  const contactInfo = [
    { 
      icon: <MapPin className="w-5 h-5" />, 
      text: contact.address.full,
      href: contact.googleMapsLink,
    },
    { 
      icon: <Phone className="w-5 h-5" />, 
      text: contact.phone.main,
      href: `tel:${contact.phone.mainClean}`,
    },
    { 
      icon: <Mail className="w-5 h-5" />, 
      text: contact.email.reservations,
      href: `mailto:${contact.email.reservations}`,
    },
  ]

  const logoSrc = isDark
  ? asset('images/brand/logo-araucarias-white.png')
  : asset('images/brand/logo-araucarias-black.png')

  return (
    <footer className="bg-surface dark:bg-surface pt-16 pb-8">
      <Container>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <img 
                src={logoSrc}
                alt="Araucarias"
                className="w-10 h-10 object-contain"
              />
              <span className="font-heading text-xl font-semibold tracking-wide text-text-primary dark:text-white">
                ARAUCARIAS
              </span>
            </Link>
            <p className="mt-4 text-text-secondary text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-lg font-medium text-text-primary dark:text-white mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-text-secondary text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-medium text-text-primary dark:text-white mb-4">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  
                  <a  href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-text-secondary text-sm hover:text-accent transition-colors"
                  >
                    <span className="mt-0.5 text-accent">{item.icon}</span>
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-lg font-medium text-text-primary dark:text-white mb-4">
              {t('footer.followUs')}
            </h4>
            <div className="flex gap-3">
              
               <a href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-3 rounded-lg bg-gray-100 dark:bg-white/10 text-text-secondary hover:text-accent hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-white/10 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-text-secondary text-sm">
          <p>© {currentYear} {t('common.hotelName')}. Todos los derechos reservados.</p>
          <p>
            {t('footer.developedBy')}{' '}
            <a 
              href="https://trinity.com.ar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Trinity 
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer