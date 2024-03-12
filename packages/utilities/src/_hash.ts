/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { isEmpty } from "./_isType";

/**
 * calculate hash from string
 * @param str
 * @internal
 */
export const hash = (str: string) => {
  let hash = 0;
  let i;
  let chr;
  if (isEmpty(str)) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/**
 * generate uuid using `crypto.getRandomValues`
 * @internal
 */
export const uuid = () => {
  return [1e7, 1e3, 4e3, 8e3, 1e11]
    .join("-")
    .replace(/[018]/g, (c: AnyObject) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16),
    );
};
