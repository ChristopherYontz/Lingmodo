/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        // primary colors
        'primary-color-1': '#93DC5C', // primary green
        'primary-color-2': '#0090FF', // primary blue for log activity icons
        'primary-color-3': '#F76E21', // primary orange for like btn
        'primary-color-4': '#27A8B7', // primary blue for add log/daily summary btn

        // utility colors
        'utility-color-1': '#000000', // black for log headers
        'utility-color-2': '#212529', // light black for headings
        'utility-color-3': '#777777', // utility gray text
        'utility-color-4': '#AFAFAF', // gray for action icons on progress updates
        'utility-color-5': '#4B4B4B', // gray for action icons everywhere else
        'utility-color-6': '#E5E5E5', // gray for disactivated buttons and toggles

        // background colors
        'background-1': '#F3F2F7', // gray background
      },
      fontFamily: {
        custom: ["Inter", "sans-serif"],
      },
      fontWeight: {
        custom: {
          light: 300,
          normal: 400,
          semibold: 600,
          bold: 800,
        }
      }
    },
  },
  plugins: [],
}

// require("daisyui")
