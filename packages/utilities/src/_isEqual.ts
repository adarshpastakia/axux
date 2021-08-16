// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isBoolean, isNumber, isObject, isString } from "./_isType";

/** @internal */
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
