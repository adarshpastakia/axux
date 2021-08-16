// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import "@testing-library/jest-dom";
import "jsdom-global";
import "mutationobserver-shim";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

Object.defineProperty(window, "crypto", {
  value: { getRandomValues: () => new Uint8Array([Math.random() * 256]) }
});

const originalError = console.error;
console.error = (...args) => {
  if (/.*ReactDOM.render is no longer supported in React 18.*/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};

Element.prototype.getBoundingClientRect = jest.fn(
  () =>
    ({
      width: 120,
      height: 120,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    } as DOMRect)
);
