/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B5D2A3",
        accent: "#FAF8F5",
        muted: "#FAF8F5",
        text: "#333333",
        danger: "#E45C5C"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"]
      }
    }
  },
  plugins: [],
};
