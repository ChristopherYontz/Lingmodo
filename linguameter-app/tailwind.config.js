/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        'gray-bg': '#F3F2F7',
        'green-primary': '#93DC5C'
      }
    },
  },
  plugins: [require("daisyui")],
}

