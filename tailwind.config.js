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
        base: 'var(--color-base)',
        surface: 'var(--color-surface)',
        sunken: 'var(--color-sunken)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
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