/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'desktop': '250px',
        'tablet': '50px',
        'mobile': '20px',
      },
      colors: {
        'primary': '#91C28D',
        'secondary': '#DEF1DD',
        'accent': {
          '100': '#214CBA',
          '200': '#669162'
        },
        'background': '#F2F5FD',
        'text': '#2F2F2F',
        'background-secondary': '#E6E9F0',
        'gray': '#A4A4A4',
        'white': '#FAFAFA',
        'light-gray': '#c7c7c7Af',
      }
    },
  },
  plugins: [],
}

