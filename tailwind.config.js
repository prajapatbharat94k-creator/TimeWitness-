/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0D11',
        surface: {
          DEFAULT: '#14141C',
          hover: '#1B1B26',
          border: '#242434',
          card: '#161622',
        },
        gold: {
          50: '#FFFBEA',
          100: '#FFF3C4',
          200: '#FFE588',
          300: '#FFD34D',
          400: '#F5C222',
          500: '#D4AF37', // Core metallic gold
          600: '#B89220',
          700: '#916E14',
          800: '#6E5010',
          900: '#4A350B',
          glow: '#D4AF3740',
        },
        slate: {
          400: '#94A3B8',
          300: '#CBD5E1',
          500: '#64748B',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFF3C4 0%, #D4AF37 50%, #916E14 100%)',
        'gold-glow': 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(13, 13, 17, 0) 70%)',
        'cinematic-gradient': 'linear-gradient(180deg, rgba(13,13,17,0.4) 0%, rgba(13,13,17,0.95) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 40px -5px rgba(212, 175, 55, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
