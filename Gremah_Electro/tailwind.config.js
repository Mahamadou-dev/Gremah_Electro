/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode support; active le mode dark tailwind
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
  },
  plugins: [],
}
}