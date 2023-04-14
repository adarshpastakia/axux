/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: [
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-jest",
    "@storybook/addon-a11y",
    "./addon-theme/register.tsx",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript-plugin",
  },
  staticDirs: ["../assets"],
  framework: "@storybook/react",
  webpackFinal: (config) => {
    // Workaround for @storybook/addon-jest on Webpack 5
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        path: require.resolve("path-browserify"),
      },
    };

    config.plugins.push(
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ["json", "text", "markdown"],
      })
    );

    return config;
  },
};
