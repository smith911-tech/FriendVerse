/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
        screens: {
      'sm500': '500px',
      // => @media (min-width: 506px) { ... }

      'md734': '734px',
      // => @media (min-width: 734px) { ... }

      'lg1280': '1280px',
      // => @media (min-width: 1280px) { ... }

        'lg1440': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {},
  },
  plugins: [],
}

