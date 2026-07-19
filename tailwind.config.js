/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    // Preflight resets base element styles (headings, buttons, etc.).
    // Disabled to avoid visual regressions in the existing Bootstrap/CSS design.
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
