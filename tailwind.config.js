/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,md}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1"
      }
    },
  },
  darkMode: "class",
  plugins: [
    require("flowbite/plugin"),
    require('postcss-import'),
    require("tailwindcss"),
    require("autoprefixer"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class",
    })
  ],
}

