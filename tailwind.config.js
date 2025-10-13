/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#3E5E47",   // deep forest
          cream: "#F6F3EA",   // warm paper
          charcoal: "#1F1F1F",
          gold: "#C7A969",
        }
      },
      fontFamily: {
        display: ["var(--ff-display)", "serif"],
        sans: ["var(--ff-sans)", "system-ui", "sans-serif"],
      }
    },
  },
  plugins: [],
};
