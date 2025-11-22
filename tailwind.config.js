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
      keyframes: {
        leftWall: {
          "0%": { top: "0px" },
          "25%": { top: "200px" },
          "100%": { top: "0px" },
        },
        rightWall: {
          "0%": { top: "200px" },
          "50%": { top: "0px" },
          "100%": { top: "200px" },
        },
        bounceBall: {
          "0%": { left: "0px", top: "30px" },
          "25%": { left: "250px", top: "252px" },
          "50%": { left: "490px", top: "30px" },
          "75%": { left: "250px", top: "252px" },
          "100%": { left: "0px", top: "30px" },
        },
      },
      animation: {
        "left-wall": "leftWall 3s infinite",
        "right-wall": "rightWall 3s infinite",
        "bounce-ball": "bounceBall 3s linear infinite",
      },
    },
    screens: {
      sm: "640px", // mobile large / tablet herizontal
      md: "768px", // tablet vertical / small laptop
      lg: "1024px", // laptop
      xl: "1280px", // desktop
      "2xl": "1536px",
    },
  },
  plugins: [],
};
