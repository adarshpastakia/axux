// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isArray, isEmpty, isNil, isObject } from "./_isType";

const _get = (hit: AnyObject, field: string): AnyObject => {
  if (isEmpty(hit)) {
    return undefined;
  }

  if (isObject(hit)) {
    if (!isNil(hit[field])) {
      return hit[field];
    }

    if (field.includes(".")) {
      let currentValue: AnyObject = hit;

      const path = field.split(".");
      for (let i = path.length - 1; i >= 0; i--) {
        const outerPath = path.slice(0, i as AnyObject).join(".");
        const innerPath = path.slice(i as AnyObject).join(".");
        if (outerPath in currentValue) {
          currentValue = currentValue[outerPath];
          if (isArray(currentValue)) {
            return currentValue.map((val) => _get(val, innerPath)).filter((val) => !isEmpty(val));
          } else {
            return _get(currentValue, innerPath);
          }
        }
      }
    }
  }

  return undefined;
};

/** @internal */
export const getByPath = (obj: KeyValue, path: string, defaultValue: AnyObject = undefined) => {
  if (isEmpty(obj) || isEmpty(path)) {
    return defaultValue;
  }
  const value = _get(obj, path);
  if (!isEmpty(value)) {
    return value;
  }
  return defaultValue;
};
