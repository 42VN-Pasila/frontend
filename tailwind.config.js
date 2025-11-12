/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        chakra: ['"Chakra Petch"', "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          orange: "#FF5F24",
        },
      },
    },
  },
  plugins: [],
};
