/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#ED41FC",
        "secondary": "#E1FDD1",
        "primary-light": "#f3f5ff",
        "light": "#E1FDD1"
      },
      fontFamily: {
        'Audiowide': ['Audiowide']
      }
    },
  },
  plugins: [],
}

