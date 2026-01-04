import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Providers
import { ThemeProvider } from './context/ThemeContext'

// i18n - importar para inicializar
import './i18n'

// Estilos
import './index.css'

// App
import App from './App'

/**
 * Loading fallback para Suspense (i18n)
 * Pantalla minimalista mientras cargan las traducciones
 */
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-base dark:bg-base-dark flex items-center justify-center">
      <div className="text-text-secondary dark:text-text-secondary-dark animate-pulse">
        <svg 
          className="w-8 h-8 mx-auto mb-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
          />
        </svg>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Suspense fallback={<LoadingFallback />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
)