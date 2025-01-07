import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Metallic theme colors
        primary: {
          DEFAULT: '#C0C0C0', // Elegant silver
          light: '#D3D3D3',
          dark: '#A9A9A9',
        },
        accent: {
          DEFAULT: '#B8860B', // Metallic gold
          light: '#DAA520',
          dark: '#8B6914',
        },
        background: {
          DEFAULT: '#F5F5F5', // Light platinum
          dark: '#E8E8E8',
        },
        text: {
          DEFAULT: '#333333', // Deep charcoal
          light: '#666666',
        },
      },
      backgroundImage: {
        'gradient-metallic': 'linear-gradient(145deg, var(--tw-colors-primary-DEFAULT), var(--tw-colors-background-DEFAULT))',
        'gradient-accent': 'linear-gradient(145deg, var(--tw-colors-accent-DEFAULT), var(--tw-colors-accent-light))',
      },
      boxShadow: {
        'elegant': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'elegant-lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config 