/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { addons } from "@storybook/addons";

addons.setConfig({
  sidebar: {
    showRoots: true,
  },
});

const originalError = console.error;
window.console.error = (...args) => {
  if (
    /.*ReactDOM.render is no longer supported in React 18.*/.test(args[0]) ||
    /.*\:first-child.*/.test(args[0])
  ) {
    return;
  }
  originalError.call(console, ...args);
};
