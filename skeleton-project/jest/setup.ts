/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { jest } from "@jest/globals";
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
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, "crypto", {
  value: { getRandomValues: () => new Uint8Array([Math.random() * 256]) },
});

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
      right: 0,
    }) as DOMRect,
);
