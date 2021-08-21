// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  core: {
    builder: "webpack5"
  },
  stories: [
    "../storybook/**/*.@(js|jsx|ts|tsx|mdx)",
    "../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  addons: [
    "@storybook/preset-scss",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-jest",
    "./addon-theme/register.tsx"
  ],
  // @ts-ignore
  webpackFinal: (config) => {
    // Workaround for @storybook/addon-jest on Webpack 5
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        path: require.resolve("path-browserify")
      }
    };

    config.plugins.push(
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ["json", "javascript", "css", "html", "text", "markdown", "typescript"]
      })
    );

    return config;
  }
};
