/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.html", "./src/**/*.scss"],
  theme: {
    extend: {
      fontFamily: {
        CORBEL: "CORBEL",
      },
      backgroundColor: {
        bg: "#F6F6F6",
        theme: "#344340",
        KMT: "#4889C1",
        DPP: "#58AC6F",
        PFP: "#F2854A",
      },
      screens: {
        main: "1920px",
      },
      colors: {
        focus: "#333",
        noFocus: "#989898",
        theme: "#344340",
        bg: "#F6F6F6",
        KMT: "#4889C1",
        DPP: "#58AC6F",
        PFP: "#F2854A",
      },
    },
  },
  plugins: [],
};
