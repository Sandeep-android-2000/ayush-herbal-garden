/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F0EB',
          100: '#CCE0D6',
          200: '#99C1AE',
          300: '#66A385',
          400: '#33845D',
          500: '#2D6A4F', // Main primary color
          600: '#245540',
          700: '#1C4030',
          800: '#132A20',
          900: '#091510',
        },
        secondary: {
          50: '#F2EDE9',
          100: '#E5DBD3',
          200: '#CBB8A7',
          300: '#B2947B',
          400: '#98714F',
          500: '#774936', // Main secondary color
          600: '#5F3A2B',
          700: '#472C20',
          800: '#301D16',
          900: '#180F0B',
        },
        accent: {
          50: '#FBF6EF',
          100: '#F7ECDF',
          200: '#EFD9BF',
          300: '#E7C69F',
          400: '#DFB47F',
          500: '#D4A373', // Main accent color
          600: '#AA825C',
          700: '#7F6245',
          800: '#55412E',
          900: '#2A2117',
        },
        success: {
          500: '#22C55E',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      minHeight: {
        'screen-75': '75vh',
      },
    },
  },
  plugins: [],
}