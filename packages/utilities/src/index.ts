/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

/* istanbul ignore file */

export {
  useEffectDebugger,
  useLayoutEffectDebugger,
} from "./useEffectDebugger";
export { useLogger } from "./useLogger";
export * from "./_ascii";
export { default as Countries } from "./_countries";
export type { Country } from "./_countries";
export * from "./_debounce";
export { _fetch as fetch } from "./_fetch";
export * from "./_format";
export * from "./_getByPath";
export * from "./_hash";
export * from "./_interpolate";
export * from "./_isEqual";
export * from "./_isType";
export * from "./_tokenize";
export * from "./_dedupe";
export * from "./_boundingBox";

import { default as Countries } from "./_countries";

// @ts-ignore
window.Countries = Countries;
