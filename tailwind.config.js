
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0a0a0a',
          rich: '#121212',
          soft: '#1a1a1a',
          gold: '#d4af37',
          'gold-soft': '#c9a961',
          'gold-dark': '#b8941e',
          bronze: '#cd7f32',
        },
        neon: {
          cyan: '#00d9ff',
          magenta: '#ff006e',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'leather': 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)',
      },
      boxShadow: {
        'glow-gold': '0 0 15px rgba(212, 175, 55, 0.3)',
        'glow-cyan': '0 0 15px rgba(0, 217, 255, 0.3)',
      }
    },
  },
  plugins: [],
}
