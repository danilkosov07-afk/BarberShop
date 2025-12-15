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
        primary: {
          dark: '#0B0B0B',
          light: '#FFFFFF',
          accent: '#F59E0B',
          gray: {
            dark: '#1F1F1F',
            light: '#E5E5E5',
          },
        },
      },
      fontSize: {
        'display-1': ['clamp(3rem, 5vw + 1rem, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-2': ['clamp(2.25rem, 4vw + 0.5rem, 4rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-3': ['clamp(1.875rem, 3vw + 0.5rem, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h1': ['clamp(2rem, 3vw + 0.5rem, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['clamp(1.75rem, 2.5vw + 0.5rem, 2.75rem)', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['clamp(1.5rem, 2vw + 0.5rem, 2.25rem)', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],
        'h4': ['clamp(1.25rem, 1.5vw + 0.5rem, 1.875rem)', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'h5': ['clamp(1.125rem, 1vw + 0.5rem, 1.5rem)', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],
        'h6': ['clamp(1rem, 0.5vw + 0.5rem, 1.25rem)', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],
        'body-lg': ['clamp(1.125rem, 0.5vw + 0.5rem, 1.25rem)', { lineHeight: '1.75', letterSpacing: '0' }],
        'body': ['clamp(1rem, 0.25vw + 0.5rem, 1.125rem)', { lineHeight: '1.75', letterSpacing: '0' }],
        'body-sm': ['clamp(0.875rem, 0.25vw + 0.5rem, 1rem)', { lineHeight: '1.6', letterSpacing: '0' }],
        'caption': ['clamp(0.75rem, 0.25vw + 0.5rem, 0.875rem)', { lineHeight: '1.5', letterSpacing: '0.01em' }],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      spacing: {
        'section': 'clamp(6rem, 12vw, 12rem)',
        'section-sm': 'clamp(4rem, 8vw, 8rem)',
        'section-lg': 'clamp(8rem, 16vw, 16rem)',
      },
    },
  },
  plugins: [],
}
export default config

