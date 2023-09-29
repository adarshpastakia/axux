import { dirname, join } from "path";
/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

const path = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
import type { StorybookConfig } from "@storybook/react-webpack5";

const mainConfig: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../packages/**/*.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-jest",
    "@storybook/addon-a11y",
    "./addon-theme/register.tsx",
    {
      name: "@storybook/addon-styling",
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: {
          implementation: require.resolve("postcss"),
        },
      },
    },
  ],
  staticDirs: ["../assets"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (config) => {
    // Workaround for @storybook/addon-jest on Webpack 5
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        path: require.resolve("path-browserify"),
      },
    };
    config.module?.rules?.push({
      test: /\.tsx?$/,
      exclude: /(node_modules)/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    chrome: 100,
                  },
                },
              ],
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
          },
        },
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      ],
    });
    config.plugins?.push(
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ["json", "text", "html", "markdown"],
      })
    );
    return config;
  },
};
export default mainConfig;
