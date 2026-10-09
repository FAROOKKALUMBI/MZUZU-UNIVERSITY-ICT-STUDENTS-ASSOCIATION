/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        muisa: {
          green: '#1B6B35',
          'green-dark': '#155429',
          'green-light': '#238a45',
          gold: '#F5B83D',
          'gold-hover': '#e5aa32',
          'gold-light': '#fdf2db',
          gray: '#D9D9D9',
          'gray-light': '#F3F4F6',
          dark: '#1F2937',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'btn': '2px',
      },
      boxShadow: {
        'tab': '0 2px 6px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
