// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

/** @internal */
export { makeMargin } from "./margin";
/** @internal */
export { makePadding } from "./padding";

export const isColor = (color: string) => color.startsWith("#") || color.startsWith("rgb");
