import { defineConfig } from 'tailwindcss';

import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Active le dark mode par la classe "dark"
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f42c37',
        secondary: '#f4f4f4',
        brandYellow: '#f4c300',
        brandBlue: '#00a3ff',
        brandGreen: '#00ff00',
        brandRed: '#ff0000',
        brandPurple: '#800080',
        brandPink: '#ff00ff',
        brandOrange: '#ffa500',
        brandGray: '#808080',
        brandWhite: '#eeeeee',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '3rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      keyframes: {
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInLeft: 'fadeInLeft 0.4s ease-out',
        fadeInUp: 'fadeInUp 0.4s ease-out',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
  ]
}
