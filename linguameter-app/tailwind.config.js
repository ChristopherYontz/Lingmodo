/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        'gray-bg': '#F3F2F7',
        'green-primary': '#93DC5C'
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
  plugins: [require("daisyui")],
}

