/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#fff7ec',
        secondary: '#f5e3d9',
        system: {
          black: '#32312d',
          white: '#FFFFFF',
          gray: '#F5F5F5',
        },
      },
    },
  },
  plugins: [],
};
