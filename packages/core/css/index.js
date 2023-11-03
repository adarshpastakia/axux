/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = plugin(
  ({ addUtilities, matchUtilities, theme }) => {
    matchUtilities({
      "grid-area": (value) => ({
        gridArea: value,
      }),
    });
    addUtilities({
      ".panel": {
        display: "grid",
        "grid-area": "content",
        "grid-template-areas":
          '"loader loader loader" "head head head" "side-s content side-e" "foot foot foot"',
        "grid-template-columns": "auto 1fr auto",
        "grid-template-rows": "auto auto 1fr auto",
        overflow: "hidden",
      },
    });
  },
  {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          primary: {
            50: "rgb(var(--color-primary-50) / <alpha-value>)",
            100: "rgb(var(--color-primary-100) / <alpha-value>)",
            200: "rgb(var(--color-primary-200) / <alpha-value>)",
            300: "rgb(var(--color-primary-300) / <alpha-value>)",
            400: "rgb(var(--color-primary-400) / <alpha-value>)",
            500: "rgb(var(--color-primary-500) / <alpha-value>)",
            600: "rgb(var(--color-primary-600) / <alpha-value>)",
            700: "rgb(var(--color-primary-700) / <alpha-value>)",
            800: "rgb(var(--color-primary-800) / <alpha-value>)",
            900: "rgb(var(--color-primary-900) / <alpha-value>)",
            950: "rgb(var(--color-primary-950) / <alpha-value>)",
          },
          accent: {
            50: "rgb(var(--color-accent-50) / <alpha-value>)",
            100: "rgb(var(--color-accent-100) / <alpha-value>)",
            200: "rgb(var(--color-accent-200) / <alpha-value>)",
            300: "rgb(var(--color-accent-300) / <alpha-value>)",
            400: "rgb(var(--color-accent-400) / <alpha-value>)",
            500: "rgb(var(--color-accent-500) / <alpha-value>)",
            600: "rgb(var(--color-accent-600) / <alpha-value>)",
            700: "rgb(var(--color-accent-700) / <alpha-value>)",
            800: "rgb(var(--color-accent-800) / <alpha-value>)",
            900: "rgb(var(--color-accent-900) / <alpha-value>)",
            950: "rgb(var(--color-accent-950) / <alpha-value>)",
          },
          info: { ...colors.cyan },
          danger: { ...colors.red },
          warning: { ...colors.amber },
          success: { ...colors.green },
          white: "#FEFFFF",
          black: "#121c2b",
          bw: {
            1000: "#0D1117",
            950: "#030712",
            900: "#111827",
            800: "#1f2937",
            700: "#374151",
            600: "#4b5563",
            500: "#6b7280",
            400: "#9ca3af",
            300: "#d1d5db",
            200: "#e5e7eb",
            100: "#f3f4f6",
            50: "#f9fafb",
            0: "#FCFDFD",
          },
          crumb: {
            1: "#096ea6",
            2: "#1579af",
            3: "#2284b8",
            4: "#2e8ec1",
            5: "#3a99ca",
            6: "#409ece",
            7: "#46a3d3",
            8: "#4ca9d8",
            9: "#52aedc",
          },
        },
        fontSize: {
          md: ["1.125rem", { lineHeight: "1.75rem" }],
          lg: ["1.25rem", { lineHeight: "1.75rem" }],
          xl: ["1.5rem", { lineHeight: "2rem" }],
          "2xl": ["1.75rem", { lineHeight: "2rem" }],
        },
      },
    },
  }
);
