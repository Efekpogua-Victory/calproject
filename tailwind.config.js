/* eslint-disable prettier/prettier */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: false,
  },
  plugins: [
    require("daisyui"),
    // require("tailwind-bootstrap-grid")({
    //     containerMaxWidths: { sm: "540px", md: "720px", lg: "960px", xl: "1140px" },
    // }),
  ],
};
