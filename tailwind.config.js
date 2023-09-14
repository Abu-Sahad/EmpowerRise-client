/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cDark: "#03001c",
        cLightDark: "#8D8C8A",
        cLightWhite: "#F6F6F6",
        cDarkBlue: "#0079FF",
        cLightBlue: "#45CFDD",
        cLightDarkBlue: "#79E0EE",
        cLightLightBlue: "#98EECC",
        cBlueGreen: "#D0F5BE",
        cLightBlueGreen: "#FBFFDC",
        cPurple: "#8062D6",
        cViolate: "#810CA8",
        cPink: "#FB2576",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};

