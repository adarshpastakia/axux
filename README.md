# ![Logo](./assets/poster-dark.png)

---

[![Stars](https://img.shields.io/github/stars/adarshpastakia/axux.svg?logoColor=blue&style=social&logo=github "GitHub Stars")](https://github.com/adarshpastakia/axux/stargazers)
[![Forks](https://img.shields.io/github/forks/adarshpastakia/axux.svg?logoColor=blue&style=social&logo=github "GitHub Forks")](https://github.com/adarshpastakia/axux/network/members)
[![Issues](https://img.shields.io/github/issues/adarshpastakia/axux.svg?logoColor=blue&style=social&logo=github "GitHub Issues")](https://github.com/adarshpastakia/axux/issues)

![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&labelColor=333&logo=none)
![node](https://img.shields.io/badge/node-≥15.0.0-blue.svg?style=flat-square&labelColor=333&logo=none)
![Build](https://img.shields.io/github/workflow/status/adarshpastakia/axux/Build%20and%20Deploy?style=flat-square&logo=github&labelColor=333&label=build)
![Deps](https://img.shields.io/librariesio/github/adarshpastakia/axux?style=flat-square&logo=libraries.io&logoColor=fff&labelColor=333&label=dependencies)
![Maintain](https://img.shields.io/codeclimate/maintainability/adarshpastakia/axux?style=flat-square&logo=code%20climate&labelColor=333&label=maintainability)
![Coverage](https://img.shields.io/codeclimate/coverage/adarshpastakia/axux?style=flat-square&logo=code%20climate&labelColor=333&label=coverage)
![Issues](https://img.shields.io/codeclimate/issues/adarshpastakia/axux?style=flat-square&logo=code%20climate&labelColor=333&label=issues)

[![lerna](https://img.shields.io/badge/lerna-677ef8.svg?style=flat-square&labelColor=333&logo=lerna)](https://lerna.js.org/)
[![yarn](https://img.shields.io/badge/yarn-2C8EBB.svg?style=flat-square&labelColor=333&logo=yarn)](https://yarnpkg.com/)
[![react](https://img.shields.io/badge/react-61DAFB.svg?style=flat-square&labelColor=333&logo=react)](http://reactjs.org/)
[![ts](https://img.shields.io/badge/typescript-3178C6.svg?style=flat-square&labelColor=333&logo=typescript)](https://typescriptlang.org/)
[![emotion](https://img.shields.io/badge/tailwindcss-06B6D4.svg?style=flat-square&labelColor=333&logo=tailwindcss)](https://tailwindcss.com/)
[![prettier](https://img.shields.io/badge/prettier-EA4C89.svg?style=flat-square&labelColor=333&logo=prettier)](https://prettier.io/)
[![codeclimate](https://img.shields.io/badge/code%20climate-272425.svg?style=flat-square&labelColor=333&logo=code%20climate)](http://codeclimate.com/)

> <small>Badges provided by</small>
>
> [![shieldsio](https://img.shields.io/badge/shields-io-111.svg?style=flat-square&logo=greenkeeper)](https://shields.io/)

---

## Installation

```bash
# using npm
npm install @axux/core @axux/data @axux/form @axux/utilies

# using yarn
yarn add @axux/core @axux/data @axux/form @axux/utilies
```

Add `postcss.config` to project

```js
// postcss.config.js
module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Add `tailwind.config` to project

```js
// tailwind.config.js
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        accent: colors.pink,
        danger: colors.red,
        warning: colors.yellow,
        success: colors.green,
      },
    },
  },
  plugins: [
    // axux-core tailwind plugin
    require("@axux/core/css"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
```

> for custom colors pass object of colors {50,100,200,300,400,500,600,700,800,900}

---

## Usage

Basic styles

```css
/* src/styles.css */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@axux/core/css/style.css";
@import "@axux/data/css/style.css";
@import "@axux/date/css/style.css";
@import "@axux/form/css/style.css";

/* optional flag css */
/* country flags ≈100KB */
@import "@axux/utilities/css/flags.css";
/* country flags wavy ≈500KB */
@import "@axux/utilities/css/flags-wavy.css";
```

React root render

```tsx
/* src/index.tsx */
import { AxViewport, AxApplicationProvider } from "@axux/core";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <AxApplicationProvider>
      <AxViewport>. . .</AxViewport>
    </AxApplicationProvider>
  </StrictMode>
);
```

---

## Dependencies

- ### [react@18](//reactjs.org)
- ### [tailwindcss](//tailwindcss.com)

#### CSS tooling

- postcss (version >=7 <8 due to monaco-editor)
- postcss-import
- postcss-nesting

#### Editor

- react-monaco-editor

#### Formatters

- date-fns
- numeral
- libphonenumber
