/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode:"class",
  theme: {
    extend: {
      backgroundColor:{
        mainRed: "#FF3B5C"
        
      },
      borderColor:{
        mainRed:"#FF3B5C"
      },
      textColor :{
        mainRed:"#FF3B5C"
      }
    },
  },
  plugins: [],
};