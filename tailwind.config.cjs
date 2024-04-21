const { resolveProjectPath } = require('wasp/dev')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    resolveProjectPath('./src/**/*.{js,jsx,ts,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  colors.lime[50],
          100: colors.lime[100],
          200: colors.lime[200],
          300: colors.lime[300],
          400: colors.lime[400],
          500: colors.lime[500],
          600: colors.lime[600],
          700: colors.lime[700],
          800: colors.lime[800],
          900: colors.lime[900],
        }
      }
    },
  },
}