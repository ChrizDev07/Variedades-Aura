/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Colores personalizados para Variedades Aura
      colors: {
        'aura': {
          primary: '#7c3aed',
          'primary-dark': '#6d28d9',
          'primary-light': '#8b5cf6',
          secondary: '#ec4899',
          'secondary-dark': '#db2777',
          accent: '#06b6d4',
          success: '#10b981',
          danger: '#ef4444',
          warning: '#f59e0b',
          info: '#3b82f6',
        },
        'brand': {
          purple: '#7c3aed',
          pink: '#ec4899',
          cyan: '#06b6d4',
        }
      },
      
      // Fuentes personalizadas
      fontFamily: {
        'sans': ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'sans-serif'],
      },
      
      // Animaciones personalizadas
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'fadeInLeft': 'fadeInLeft 0.5s ease-out',
        'fadeInRight': 'fadeInRight 0.5s ease-out',
        'slideIn': 'slideIn 0.3s ease-out',
        'scaleIn': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      
      // Keyframes para animaciones
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      
      // Sombras personalizadas
      boxShadow: {
        'aura-sm': '0 1px 2px 0 rgb(124 58 237 / 0.05)',
        'aura': '0 1px 3px 0 rgb(124 58 237 / 0.1), 0 1px 2px -1px rgb(124 58 237 / 0.1)',
        'aura-md': '0 4px 6px -1px rgb(124 58 237 / 0.1), 0 2px 4px -2px rgb(124 58 237 / 0.1)',
        'aura-lg': '0 10px 15px -3px rgb(124 58 237 / 0.1), 0 4px 6px -4px rgb(124 58 237 / 0.1)',
        'aura-xl': '0 20px 25px -5px rgb(124 58 237 / 0.1), 0 8px 10px -6px rgb(124 58 237 / 0.1)',
        'aura-2xl': '0 25px 50px -12px rgb(124 58 237 / 0.25)',
        'inner-glow': 'inset 0 0 20px rgba(124, 58, 237, 0.1)',
      },
      
      // Bordes redondeados
      borderRadius: {
        'aura': '0.75rem',
        'aura-lg': '1rem',
        'aura-xl': '1.5rem',
      },
      
      // Altura personalizada
      height: {
        'screen-90': '90vh',
      },
      
      // Ancho personalizado
      width: {
        'sidebar': '20rem',
      },
      
      // Opacidad
      opacity: {
        '15': '0.15',
        '35': '0.35',
      },
      
      // Gradientes personalizados
      backgroundImage: {
        'gradient-aura': 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
        'gradient-aura-reverse': 'linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)',
        'gradient-aura-dark': 'linear-gradient(135deg, #6d28d9 0%, #db2777 100%)',
        'gradient-shop': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-sale': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      
      // Transiciones
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      
      transitionDuration: {
        '2000': '2000ms',
      },
      
      // Z-Index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    // Plugin para formas personalizadas (opcional)
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-md': {
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.12)',
        },
        '.text-shadow-lg': {
          textShadow: '6px 6px 12px rgba(0, 0, 0, 0.15)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.bg-blur': {
          backdropFilter: 'blur(10px)',
        },
        '.bg-blur-md': {
          backdropFilter: 'blur(20px)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}