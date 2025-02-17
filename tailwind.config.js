/** @type {import('tailwindcss').Config} */

const fpluggin = require("flowbite/plugin");
// fpluggin.plugins.map(p =>  p.f)
module.exports = {
  content: [
    "./src/**/*.{html,ts,md}",
    // "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1"
      },
      customForms: theme => ({
        default: {
          checkbox: {
            '[&:checked]': {
              background: undefined
            }
          }
        }
      }),
      width: {
        '4.5': '1.125rem',
        '1.5': '0.375rem'
      },
      height: {
        '4.5': '1.125rem',
        '1.5': '0.375rem'
      }
    },
  },
  darkMode: "class",
  plugins: [
    fpluggin,
    require('postcss-import'),
    require("tailwindcss"),
    require("autoprefixer"),
    require("@tailwindcss/typography"),
    /**
     * require("@tailwindcss/forms")({ strategy: 'class'})
     *
     * */
  ],
}

