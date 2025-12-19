/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
