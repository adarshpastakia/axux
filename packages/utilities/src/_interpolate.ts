/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { getByPath } from "./_getByPath";

/**
 * interpolate string template using model
 * @internal
 */
export const interpolate = (str: string, model: KeyValue) => {
  return str.replace(/\${([^{}]*)}/g, (a: string, b: string): AnyObject => {
    const r = getByPath(model, b);
    return typeof r === "string" || typeof r === "number" ? r : "";
  });
};

export const renderTemplate = (str: string, model: KeyValue) => {
  return str.replace(/{{([^{}]*)}}/g, (a: string, b: string): AnyObject => {
    const r = getByPath(model, b);
    return typeof r === "string" || typeof r === "number" ? r : "";
  });
};
