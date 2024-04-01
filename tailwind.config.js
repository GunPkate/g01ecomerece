/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#def81c",
        "primary-700": "#C1CD00",
        "primary-400": "#DFF547",
        "primary-300": "#E5F96E",
        "primary-100": "#F6FCC3",
        "primary-50": "#FBFFE7",
        secondary: "#222222",
        "secondary-700": "#626262",
        "secondary-500": "#9F9F9F",
        "secondary-300": "#E1E1E1",
        "secondary-100": "#F5F5F5",
        "secondary-50": "#FAFAFA",
        success: "#13ce66",
        info: "#3366FF",
        warning: "#FFB020",
        danger: "#FF000D",
      },
      screens: {
        tablet: "640px",

        laptop: "768px",

        desktop: "1920px",
      },
    },
  },
  plugins: [],
}