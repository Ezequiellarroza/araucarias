import { Link } from 'react-router-dom'

function Card({
  children,
  variant = 'raised',
  hover = true,
  padding = 'default',
  to,
  onClick,
  className = '',
  ...props
}) {
  // Variantes
  const variants = {
    raised: 'bg-white dark:bg-surface shadow-sm',
    flat: 'bg-surface dark:bg-surface',
    outline: 'bg-transparent border border-gray-200 dark:border-gray-700',
  }

  // Padding
  const paddings = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8',
  }

  // Hover effect
  const hoverEffect = hover 
    ? 'hover:shadow-md hover:translate-y-[-2px] cursor-pointer transition-all duration-200' 
    : 'transition-all duration-200'

  // Clases combinadas
  const cardClasses = `
    rounded-xl
    ${variants[variant]}
    ${paddings[padding]}
    ${hoverEffect}
    ${className}
  `

  // Si es link interno
  if (to) {
    return (
      <Link to={to} className={`block ${cardClasses}`} {...props}>
        {children}
      </Link>
    )
  }

  // Si es clickeable
  if (onClick) {
    return (
      <div onClick={onClick} className={cardClasses} {...props}>
        {children}
      </div>
    )
  }

  // Card estática
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  )
}

// Subcomponente para imagen
Card.Image = function CardImage({ src, alt, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-lg -m-6 mb-4 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  )
}

// Subcomponente para título
Card.Title = function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`font-heading text-2xl text-text-primary dark:text-text-primary mb-2 ${className}`}>
      {children}
    </h3>
  )
}

// Subcomponente para descripción
Card.Description = function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-text-secondary text-sm leading-relaxed ${className}`}>
      {children}
    </p>
  )
}

// Subcomponente para footer
Card.Footer = function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  )
}

export default Card