/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ascii } from "./_ascii";
import { isBoolean, isNumber, isObject, isString } from "./_isType";

/**
 * check equality of objects
 * @internal
 */
export const isEqual = (obj: AnyObject, test: AnyObject): boolean => {
  if (isString(obj) || isNumber(obj) || isBoolean(obj)) {
    return obj === test;
  } else if (Array.isArray(obj) && Array.isArray(test)) {
    // if length dont match return false
    if (obj.length !== test.length) {
      return false;
    }
    // check if some value is false
    return !obj.some((o, i) => !isEqual(o, test[i]));
  } else if (isObject(obj) && isObject(test)) {
    const okeys = Object.keys(obj);
    const tkeys = Object.keys(test);
    // if keys length dont match return false
    if (okeys.length !== tkeys.length) {
      return false;
    }
    // if keys dont match return false
    if (okeys.some((k) => !tkeys.includes(k))) {
      return false;
    }
    // check if some value is false
    return !Object.keys(obj).some((k) => !isEqual(obj[k], test[k]));
  }
  return false;
};

/**
 * match strings
 * @internal
 */
export const matchString = (base: string, match: string) => {
  const _base = ascii(base).toLowerCase();
  const _match = ascii(match).toLowerCase();

  return _base.includes(_match);
};

/**
 * compare values
 * @internal
 */
export const compareValues =
  (order: "asc" | "desc" = "asc", key?: string) =>
  (a: AnyObject, b: AnyObject) => {
    const aValue = key ? a[key] : a;
    const bValue = key ? b[key] : b;

    const bigger = order === "asc" ? 1 : -1;
    const smaller = order === "desc" ? 1 : -1;
    // return 0 when equal, allowing for multiple sorting properties
    if (aValue === bValue) return 0;
    // if numbers check greater
    if (isNumber(aValue) && isNumber(bValue)) {
      return aValue > bValue ? bigger : smaller;
    }
    // if boolean sort true first
    if (isBoolean(aValue) && isBoolean(bValue)) {
      return aValue ? smaller : bigger;
    }
    const _a = ascii(aValue).toLowerCase();
    const _b = ascii(bValue).toLowerCase();
    return _a.localeCompare(_b) === 1 ? bigger : smaller;
  };
