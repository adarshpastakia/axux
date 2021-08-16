// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty, isTrue } from "@axux/utilities";

/** @internal */
export const multipleValues = (prefix: string, values: string | true = "") => {
  if (isTrue(values)) return prefix;
  if (isEmpty(values)) return "";
  return values
    .split(" ")
    .map((v) => `${prefix}--${v}`)
    .join(" ");
};
