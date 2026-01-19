/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
  extend: {
    colors: {
      'camellia-dark': '#1B4332',
      'camellia-green': '#2D6A4F',
      'camellia-medium': '#52B788',
      'camellia-light': '#B7E4C7',
    }
  }
}
      }
    },
  },
  plugins: [],
}