/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
        screens: {
      "sm520": {"max": "520px"},
      // => (max-width: 733px) { ... }
    
      'sm500': '500px',
      // => @media (min-width: 506px) { ... }

      'md734': '734px',
      // => @media (min-width: 734px) { ... }

      'lg1280': '1280px',
      // => @media (min-width: 1280px) { ... }

        'lg1440': '1440px',
      // => @media (min-width: 1440px) { ... }
      
    },
    extend: {
      fontFamily: {
        "Belanosima": ['Belanosima', "sans-serif"],
        "Inter": [ 'Inter', "sans-serif"]
      }
    },
  },
  plugins: [],
}

