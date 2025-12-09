import { useState } from 'react'

function Input({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  icon,
  className = '',
  ...props
}) {
  const [focused, setFocused] = useState(false)

  // Clases del contenedor del input
  const inputWrapperClasses = `
    relative
    neu-sunken
    transition-all duration-300
    ${focused ? 'ring-2 ring-accent ring-opacity-50' : ''}
    ${error ? 'ring-2 ring-red-400 ring-opacity-50' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `

  // Clases del input
  const inputClasses = `
    w-full
    bg-transparent
    px-4 py-3
    ${icon ? 'pl-11' : ''}
    font-body text-text-primary
    placeholder:text-text-secondary placeholder:opacity-50
    focus:outline-none
    disabled:cursor-not-allowed
  `

  return (
    <div className={`mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block font-body text-sm text-text-secondary mb-2"
        >
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className={inputWrapperClasses}>
        {/* Ícono */}
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5">
            {icon}
          </span>
        )}

        {/* Input */}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={inputClasses}
          {...props}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

// Textarea variant
Input.Textarea = function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  rows = 4,
  className = '',
  ...props
}) {
  const [focused, setFocused] = useState(false)

  const textareaWrapperClasses = `
    relative
    neu-sunken
    transition-all duration-300
    ${focused ? 'ring-2 ring-accent ring-opacity-50' : ''}
    ${error ? 'ring-2 ring-red-400 ring-opacity-50' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `

  const textareaClasses = `
    w-full
    bg-transparent
    px-4 py-3
    font-body text-text-primary
    placeholder:text-text-secondary placeholder:opacity-50
    focus:outline-none
    disabled:cursor-not-allowed
    resize-none
  `

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block font-body text-sm text-text-secondary mb-2"
        >
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
      )}

      <div className={textareaWrapperClasses}>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={textareaClasses}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Input