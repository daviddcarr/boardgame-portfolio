/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      //fonts
      fontFamily: {
        'sans': ['"Roboto"', 'sans-serif'],
        'heading': ['"Righteous"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

