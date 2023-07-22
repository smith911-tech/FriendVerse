/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
        screens: {
      "sm650": {"max": "650px"},
      // => (max-width: 733px) { ... }

      "smm500": {"max": "500px"},
      // => (max-width: 733px) { ... }
    
      'sm500': '500px',
      // => @media (min-width: 506px) { ... }

      'md734': '734px',
      // => @media (min-width: 734px) { ... }

      'md800': '800px',
      // => @media (min-width: 800px) { ... }

      'md970': '970px',
      // => @media (min-width: 970px) { ... }

      'lg1150': '1150px',
      // => @media (min-width: 1150px) { ... }

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

