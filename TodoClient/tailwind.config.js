/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      width:{
        '400':'400px'
      },
      maxWidth:{
        '80':'80%'
      },
      boxShadow:{
        'custom':'0px 16px 48px 0 rgba(0,0, 255, 0.33);'
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
