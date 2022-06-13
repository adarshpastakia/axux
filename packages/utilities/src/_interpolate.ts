// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

/** @internal */
export const interpolate = (str: string, model: KeyValue) => {
  return str.replace(/\${([^{}]*)}/g, (a: string, b: string): AnyObject => {
    const r = model[b];
    return typeof r === "string" || typeof r === "number" ? r : "";
  });
};
