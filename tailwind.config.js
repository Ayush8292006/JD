/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "var(--color-brand-yellow, #F8CB46)",
          "yellow-light": "var(--color-brand-yellow-light, #FFF8E1)",
          "yellow-dark": "var(--color-brand-yellow-dark, #E6B52C)",
          green: "var(--color-brand-green, #0C831F)",
          "green-hover": "var(--color-brand-green-hover, #096818)",
          "green-light": "var(--color-brand-green-light, #EAF7ED)",
          "green-subtle": "#F2F9F3",
        },
        surface: {
          DEFAULT: "var(--color-surface, #FFFFFF)",
          off: "var(--color-surface-off, #F7F7F7)",
          muted: "#EFEFEF",
          border: "#EAEAEA",
        },
        content: {
          primary: "var(--color-text-primary, #1F1F1F)",
          secondary: "var(--color-text-secondary, #6B6B6B)",
          tertiary: "#9E9E9E",
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 12px 28px -4px rgba(0, 0, 0, 0.1)',
        'floating': '0 12px 36px -4px rgba(12, 131, 31, 0.25)',
        'glow-yellow': '0 0 24px rgba(248, 203, 70, 0.4)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 1.5s infinite',
      }
    },
  },
  plugins: [],
}

