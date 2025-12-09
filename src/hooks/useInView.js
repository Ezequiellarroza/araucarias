import { useState, useEffect, useRef } from 'react'

/**
 * Hook para detectar cuando un elemento entra en el viewport
 * @param {Object} options
 * @param {number} options.threshold - Porcentaje visible para activar (0-1)
 * @param {boolean} options.triggerOnce - Si solo debe activarse una vez
 * @param {string} options.rootMargin - Margen del root (ej: "-100px")
 * @returns {[React.RefObject, boolean]} - [ref, isInView]
 */
function useInView(options = {}) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px'
  } = options

  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, triggerOnce, rootMargin])

  return [ref, isInView]
}

export default useInView