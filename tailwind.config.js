/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#EAE6E1',
          dark: '#1A1918',
        },
        surface: {
          DEFAULT: '#F5F2EE',
          dark: '#242221',
        },
        sunken: {
          DEFAULT: '#DDD9D4',
          dark: '#141312',
        },
        text: {
          primary: {
            DEFAULT: '#2D2A26',
            dark: '#F5F2EE',
          },
          secondary: {
            DEFAULT: '#6B6560',
            dark: '#A39E98',
          },
        },
        accent: {
          DEFAULT: '#ad8c61',      // Color del cliente
          dark: '#c9a87a',         // Versión más clara para dark mode
          hover: '#9a7d56',        // Más oscuro para hover en light
          'hover-dark': '#d4b88a', // Más claro para hover en dark
        },
      },
      fontFamily: {
        heading: ['Roboto', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        'neu-raised': '-8px -8px 20px rgba(255,255,255,0.7), 8px 8px 20px rgba(0,0,0,0.12)',
        'neu-raised-dark': '-8px -8px 20px rgba(255,255,255,0.05), 8px 8px 20px rgba(0,0,0,0.4)',
        'neu-sunken': 'inset -4px -4px 10px rgba(255,255,255,0.5), inset 4px 4px 10px rgba(0,0,0,0.08)',
        'neu-sunken-dark': 'inset -4px -4px 10px rgba(255,255,255,0.03), inset 4px 4px 10px rgba(0,0,0,0.3)',
        'neu-pressed': 'inset -2px -2px 6px rgba(255,255,255,0.5), inset 2px 2px 6px rgba(0,0,0,0.08)',
        'neu-pressed-dark': 'inset -2px -2px 6px rgba(255,255,255,0.03), inset 2px 2px 6px rgba(0,0,0,0.3)',
        'neu-hover': '-10px -10px 25px rgba(255,255,255,0.8), 10px 10px 25px rgba(0,0,0,0.15)',
        'neu-hover-dark': '-10px -10px 25px rgba(255,255,255,0.07), 10px 10px 25px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        'neu': '16px',
        'neu-sm': '12px',
        'neu-lg': '24px',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}