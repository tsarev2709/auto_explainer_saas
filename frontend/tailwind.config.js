module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandTurquoise: '#40E0D0',
        brandViolet: '#C084FC',
        brandYellow: '#FFD700',
        brandPink: '#FF69B4',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
