## React lerna setup

* [Initial Setup](#initial-setup)
* [Storybook Setup](#storybook-setup)
* [ESLint config](#eslint-config)
* [StyleLint config](#stylelint-config)
* [Prettier config](#prettier-config)
* [Jest config](#jest-config)
* [Babel config](#babel-config)

### Initial setup
```bash
#!/usr/bin/env bash

# --- Init project ---
yarn init

# --- Init packages ---
# React
yarn add react react-dom
yarn add @types/react @types/react-dom @types/node -D
# Typescript
yarn add typescript
# Prettier
yarn add prettier -D
# Jest
yarn add jest ts-jest jsdom jsdom-global mutationobserver-shim jest-transform-stub -D
# Test library
yarn add @testing-library/jest-dom @testing-library/react @testing-library/react-hooks -D
# ESLint
yarn add eslint eslint-config-prettier eslint-plugin-prettier \
  eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import \
  @typescript-eslint/eslint-plugin @typescript-eslint/parser
# StyleLint
yarn add stylelint stylelint-order stylelint-prettier -DW
```

### Storybook setup
```bash
npx sb init --builder webpack5

yarn add webpack@5.0.0 @storybook/addon-jest -DW
```

### ESLint config
```json
{
  "eslintConfig": {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier"
    ],
    "plugins": [
      "@typescript-eslint",
      "import",
      "react",
      "react-hooks"
    ],
    "rules": {
      "no-extra-boolean-cast": "off",
      "comma-dangle": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-parameter-properties": "off",
      "@typescript-eslint/no-unused-vars": [
        1,
        {
          "argsIgnorePattern": "^_"
        }
      ]
    },
    "settings": {
      "react": {
        "pragma": "React",
        "version": "detect"
      }
    },
    "overrides": [
      {
        "files": [
          "*.tsx"
        ],
        "rules": {
          "react/prop-types": "off",
          "react/display-name": "off",
          "react/jsx-uses-react": "off",
          "react/react-in-jsx-scope": "off",
          "react-hooks/rules-of-hooks": "error",
          "react-hooks/exhaustive-deps": "warn"
        }
      }
    ],
    "ignorePatterns": [
      "**/*.js",
      "**/*.jsx",
      "**/*.d.ts"
    ]
  }
}
```

### StyleLint config
```json
{
  "stylelint": {
    "plugins": [
      "stylelint-order",
      "stylelint-prettier"
    ],
    "rules": {
      "at-rule-name-case": "lower",
      "block-closing-brace-empty-line-before": "never",
      "block-opening-brace-newline-after": "always",
      "color-hex-case": "lower",
      "color-hex-length": "long",
      "color-named": "never",
      "color-no-hex": null,
      "color-no-invalid-hex": true,
      "comment-empty-line-before": "always",
      "comment-whitespace-inside": "always",
      "font-family-name-quotes": "always-where-required",
      "font-family-no-duplicate-names": true,
      "font-family-no-missing-generic-family-keyword": true,
      "font-weight-notation": "numeric",
      "function-calc-no-unspaced-operator": true,
      "function-name-case": "lower",
      "function-url-quotes": "always",
      "keyframe-declaration-no-important": true,
      "length-zero-no-unit": true,
      "max-empty-lines": 1,
      "no-duplicate-at-import-rules": true,
      "no-duplicate-selectors": true,
      "no-empty-source": true,
      "no-eol-whitespace": true,
      "no-extra-semicolons": true,
      "no-invalid-double-slash-comments": true,
      "no-unknown-animations": true,
      "number-leading-zero": "always",
      "number-no-trailing-zeros": true,
      "property-case": "lower",
      "selector-pseudo-class-case": "lower",
      "selector-pseudo-class-no-unknown": true,
      "selector-pseudo-element-case": "lower",
      "selector-pseudo-element-colon-notation": "double",
      "selector-pseudo-element-no-unknown": true,
      "selector-type-case": "lower",
      "selector-type-no-unknown": true,
      "shorthand-property-no-redundant-values": true,
      "string-no-newline": true,
      "string-quotes": "double",
      "unit-case": "lower",
      "unit-no-unknown": true,
      "order/properties-alphabetical-order": true,
      "prettier/prettier": true
    },
    "ignoreFiles": [
      "**/*.css"
    ]
  }
}
```

### Prettier config
```json
{
  "prettier": {
    "printWidth": 100,
    "useTabs": false,
    "trailingComma": "none"
  }
}
```

### Jest config
```json
{
  "jest": {
    "verbose": true,
    "collectCoverage": true,
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": [
      "./jest/setup.ts"
    ],
    "roots": [
      "<rootDir>/modules"
    ],
    "testRegex": "(/__tests__/.*\\.(test|spec))\\.[jt]sx?$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json"
    ],
    "globals": {
      "ts-jest": {
        "tsconfig": "tsconfig.test.json"
      }
    },
    "transform": {
      "\\.(js|jsx|ts|tsx)$": "ts-jest",
      "\\.svg$": "jest-transform-stub"
    },
    "modulePaths": [
      "<rootDir>/packages",
      "<rootDir>/node_modules"
    ],
    "collectCoverageFrom": [
      "packages/**/src/**/*.{ts,tsx}",
      "!**/@types/**/*",
      "!**/utils/**/*",
      "!**/i18n/**/*",
      "!**/*.d.ts"
    ],
    "coveragePathIgnorePatterns": [
      "__tests__/",
      "__stories__/",
      "node_modules/"
    ],
    "coverageDirectory": "<rootDir>/coverage",
    "coverageReporters": [
      "json",
      "lcov",
      "text",
      "html"
    ]
  }
}
```

### Babel config
```json
{
  "babel": {
    "presets": [
      [
        "@babel/preset-env",
        {
          "loose": true,
          "shippedProposals": true
        }
      ]
    ]
  }
}
```
