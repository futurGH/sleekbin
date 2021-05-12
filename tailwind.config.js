const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/**/*.vue"],
  },
  darkMode: false, // or 'media' or 'class'
  important: "#app",
  theme: {
    screens: {
      // Added _bt breakpoints based on number of buttons that can comfortably be shown in editor settings bar
      xs: "280px",
      "2bt": "600px",
      sm: "640px",
      md: "768px",
      "3bt": "880px",
      lg: "1024px",
      "4bt": "1170px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
    scrollbar: ["rounded"],
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
};
