# ![Logo](./assets/poster-dark.png)

Storybook https://adarshpastakia.github.io/axux/v4

---

[![Stars](https://img.shields.io/github/stars/adarshpastakia/axux.svg?logoColor=blue&style=social&logo=github "GitHub Stars")](https://github.com/adarshpastakia/axux/stargazers)
[![Forks](https://img.shields.io/github/forks/adarshpastakia/axux.svg?logoColor=blue&style=social&logo=github "GitHub Forks")](https://github.com/adarshpastakia/axux/network/members)
[![Issues](https://img.shields.io/github/issues/adarshpastakia/axux.svg?logoColor=blue&style=social&logo=github "GitHub Issues")](https://github.com/adarshpastakia/axux/issues)

![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&labelColor=333&logo=none)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/adarshpastakia/axux/dev.yml?branch=dev&style=flat-square&logo=GitHub&label=test)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/adarshpastakia/axux/master.yml?branch=main&style=flat-square&logo=GitHub)
![Deps](https://img.shields.io/librariesio/github/adarshpastakia/axux?style=flat-square&logo=libraries.io&logoColor=fff&labelColor=333&label=dependencies)
![Maintain](https://img.shields.io/codeclimate/maintainability/adarshpastakia/axux?style=flat-square&logo=code%20climate&labelColor=333&label=maintainability)
![Coverage](https://img.shields.io/codeclimate/coverage/adarshpastakia/axux?style=flat-square&logo=code%20climate&labelColor=333&label=coverage)
![Issues](https://img.shields.io/codeclimate/issues/adarshpastakia/axux?style=flat-square&logo=code%20climate&labelColor=333&label=issues)

[![node](https://img.shields.io/badge/node-≥18.12.x-339933.svg?style=flat-square&labelColor=333&logo=node.js)](https://nodejs.org/docs/latest-v18.x/api/index.html)
[![react](https://img.shields.io/badge/react-≥19.x.x-61DAFB.svg?style=flat-square&labelColor=333&logo=react)](http://reactjs.org/)
[![ts](https://img.shields.io/badge/typescript-≥5.4.x-3178C6.svg?style=flat-square&labelColor=333&logo=typescript)](https://typescriptlang.org/)
[![lerna](https://img.shields.io/badge/lerna-677ef8.svg?style=flat-square&labelColor=333&logo=lerna)](https://lerna.js.org/)
[![yarn](https://img.shields.io/badge/yarn-2C8EBB.svg?style=flat-square&labelColor=333&logo=yarn)](https://yarnpkg.com/)
[![postcss](https://img.shields.io/badge/postcss-DD3A0A.svg?style=flat-square&labelColor=333&logo=postcss)](https://postcss.org/)
[![prettier](https://img.shields.io/badge/prettier-EA4C89.svg?style=flat-square&labelColor=333&logo=prettier)](https://prettier.io/)

![chrome](https://img.shields.io/badge/chrome-≥111-4285F4.svg?style=for-the-badge&labelColor=333&logo=googlechrome)
![safari](https://img.shields.io/badge/safari-≥16.2-006CFF.svg?style=for-the-badge&labelColor=333&logo=safari&logoColor=3498DB)
![pumpkinfox](https://img.shields.io/badge/pumpkinfox-≥113-FF7139.svg?style=for-the-badge&labelColor=333&logo=pumpkinfox)
![edge](https://img.shields.io/badge/edge-≥111-0078D7.svg?style=for-the-badge&labelColor=333&logo=microsoftedge&logoColor=3498DB)
![android](https://img.shields.io/badge/android_browser-≥122-34A853.svg?style=for-the-badge&labelColor=333&logo=android)

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

---

## Usage

Basic styles

```css
/* src/styles.css */
@import "@axux/core/css/style.css";
@import "@axux/data/css/style.css";
@import "@axux/date/css/style.css";
@import "@axux/form/css/style.css";

/* optional flag css */
/* country flags ≈100KB */
@import "@axux/core/css/flags.rect.css";
/* country flags wavy ≈500KB */
@import "@axux/core/css/flags.wavy.css";
```

React root render

```tsx
/* src/index.tsx */
import { AxViewport, AxApplicationProvider } from "@axux/core";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <AxApplicationProvider>
      <AxViewport>. . .</AxViewport>
    </AxApplicationProvider>
  </StrictMode>,
);
```

---

## Build with Parcel

```bash
# using npm
npm install parcel @parcel/compressor-brotli @parcel/compressor-gzip postcss postcss-import postcss-extend postcss-nesting --save-dev

# using yarn
yarn add parcel @parcel/compressor-brotli @parcel/compressor-gzip postcss postcss-import postcss-extend postcss-nesting --dev
```

Add `.parcelrc.json` to project

```json
// .parcelrc.json
{
  "extends": ["@parcel/config-default"],
  "compressors": {
    "*.{html,css,js,svg,map}": ["@parcel/compressor-gzip", "@parcel/compressor-brotli"]
  }
}
```

Add `.postcssrc.json` to project

```json
// .postcssrc.json
{
  "plugins": {
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nesting",
    "tailwindcss": {}
  }
}
```

```json
// package.json
{
  "source": "./public/index.html",
  "scripts": {
    "start": "parcel -p 3000",
    "build": "parcel build"
  }
}
```

> ## Known Issue: doesn't work work with CRA

---

## Dependencies

- [react@19](//reactjs.org)
- [react-router@6](//reactrouter.com)
- [tailwindcss](//tailwindcss.com)

#### CSS tooling

- postcss _(version >=7 <8 due to monaco-editor)_
- postcss-import
- postcss-nesting

#### Editor

- react-monaco-editor
- @mdxeditor/editor
- @tldraw/tldraw

#### Formatters

- date-fns
- numeral
- libphonenumber
