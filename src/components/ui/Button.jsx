import { Link } from 'react-router-dom'

function Button({
  children,
  variant = 'primary',
  size = 'default',
  href,
  to,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  icon,
  ...props
}) {
  // Variantes de estilo
  const variants = {
    primary: `
      bg-accent text-white
      shadow-md hover:shadow-lg
      hover:bg-accent-hover
      active:shadow-sm active:translate-y-[1px]
    `,
    secondary: `
      bg-white text-text-primary border border-gray-200
      shadow-sm hover:shadow-md
      hover:border-gray-300
      active:shadow-none active:translate-y-[1px]
      dark:bg-surface dark:border-gray-700 dark:hover:border-gray-600
    `,
    ghost: `
      bg-transparent text-text-primary
      hover:bg-gray-100
      dark:hover:bg-white/10
    `,
    outline: `
      bg-transparent text-accent border border-accent
      hover:bg-accent hover:text-white
    `,
    icon: `
      bg-white text-text-primary
      shadow-sm hover:shadow-md
      active:shadow-none
      dark:bg-surface
    `,
  }

  // Tamaños
  const sizes = {
    small: 'px-4 py-2 text-sm rounded-lg',
    default: 'px-6 py-3 text-base rounded-lg',
    large: 'px-8 py-4 text-lg rounded-xl',
  }

  // Clases base
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium
    transition-all duration-200 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${variant === 'icon' ? 'p-3 rounded-lg' : sizes[size]}
    ${variants[variant]}
    ${className}
  `

  // Si es link externo
  if (href) {
    return (
      
       <a href={href}
        className={baseClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {icon && <span className="w-5 h-5">{icon}</span>}
        {children}
      </a>
    )
  }

  // Si es link interno (React Router)
  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {icon && <span className="w-5 h-5">{icon}</span>}
        {children}
      </Link>
    )
  }

  // Botón normal
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  )
}

export default Button