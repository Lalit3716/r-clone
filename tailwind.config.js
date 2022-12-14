/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        default: "var(--color-text-default)",
        "default-soft": "var(--color-text-default-soft)",
        inverse: "var(--color-text-inverse)",
        "inverse-soft": "var(--color-text-inverse-soft)",
        "primary-nav": "var(--color-text-primary-nav)",
        "inverse-nav": "var(--color-text-inverse-nav)",
        disabled: "var(--disabled-text)",
        footer: "var(--color-text-footer)",
      },
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        default: "var(--color-bg-default)",
        inverse: "var(--color-bg-inverse)",
        "primary-nav": "var(--bg-primary-nav)",
        disabled: "var(--disabled-bg)",
        tertiary: "var(--color-bg-tertiary)",
        footer: "var(--color-bg-footer)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
};
