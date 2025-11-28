/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f1117',
          card: '#1a1d24',
          border: '#2d3139',
          hover: '#252830',
        }
      }
    },
  },
  plugins: [],
}
