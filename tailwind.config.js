module.exports = {
  content: [
    "./packages/**/*.{js,jsx,ts,tsx,mdx}",
    "./stories/**/*.{mdx,tsx}",
    "./.storybook/**/*.{mdx,tsx}",
  ],
  plugins: [
    require("@axux/core/css"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
