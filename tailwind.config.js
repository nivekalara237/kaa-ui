/** @type {import('tailwindcss').Config} */

const fpluggin = require("flowbite/plugin");
const plugin = require("tailwindcss");
// fpluggin.plugins.map(p =>  p.f)
module.exports = {
  content: [
    "./src/**/*.{html,ts,md}",
    // "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
        "9999": "9999"
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
      },
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
    plugin(function ({matchUtilities, theme}) {
      matchUtilities(
        {
          'auto-fill': (value) => ({
            gridTemplateColumns: `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
          }),
          'auto-fit': (value) => ({
            gridTemplateColumns: `repeat(auto-fit, minmax(min(${value}, 100%), 1fr))`,
          })
        }, {
          values: theme('width', {})
        })
    })
  ],
}

