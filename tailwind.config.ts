import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF7EE',
          200: '#EAD9A8',
          400: '#D4AF37',
          600: '#B8912C',
          800: '#8C6B1F',
        },
        night: {
          50: '#EEF1F6',
          400: '#3A4E6B',
          700: '#1B2A4A',
          900: '#0D1730',
        },
        sage: {
          100: '#EAF1EC',
          400: '#7FA184',
          600: '#587A5D',
        },
        sand: {
          50: '#FDFBF6',
          100: '#F7F1E3',
        },
        ink: '#14141A',
      },
      fontFamily: {
        heading: ['Cinzel', 'Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        arabic: ['Noto Naskh Arabic', 'Amiri', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 12px 32px -8px rgba(212, 175, 55, 0.35)',
        '3d': '0 24px 48px -12px rgba(13, 23, 48, 0.2)',
        '3d-lg': '0 32px 64px -16px rgba(13, 23, 48, 0.3)',
      },
      perspective: {
        scene: '1200px',
      },
      transitionTimingFunction: {
        vayron: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
