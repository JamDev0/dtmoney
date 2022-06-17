/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'red': '#E52E4D',
          'purple': {
            '400': '#6933FF',
            '500': '#5429CC',
          },
          'green': '#33CC95',
          'text': {
            'title': '#363F5F',
            'body': '#969CB3'
          },
          'background': '#F0F2F5',
          'shape': '#FFFFFF',
        }
      },
      fontFamily: {
        'poppins': 'Poppins'
      },
    },
    screens: {
      md: '1000px'
    }
  },
  plugins: [],
}
