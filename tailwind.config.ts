import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0A',
          card: '#1A1A1A',
          hover: '#252525',
        },
        primary: {
          DEFAULT: '#C4FF0D',
          hover: '#D4FF3D',
          dark: '#9FCC0A',
        },
        accent: {
          yellow: '#FFD60A',
          green: '#32D74B',
          blue: '#0A84FF',
          purple: '#BF5AF2',
          pink: '#FF375F',
          orange: '#FF9500',
          red: '#FF3B30',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#EBEBF599',
          tertiary: '#EBEBF54D',
        },
        border: {
          DEFAULT: '#FFFFFF14',
          light: '#FFFFFF0A',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'gradient-primary': 'linear-gradient(135deg, #C4FF0D 0%, #9FCC0A 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(196, 255, 13, 0.3)',
        'glow-lg': '0 0 40px rgba(196, 255, 13, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
