// Tailwind CSS v4 requires the separate @tailwindcss/postcss plugin.
// See: https://tailwindcss.com/docs/installation
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [tailwindcss(), autoprefixer()],
};
