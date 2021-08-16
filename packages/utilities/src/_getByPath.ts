// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isArray, isEmpty, isNil, isObject } from "./_isType";

const _flatten = (hit: AnyObject, prefix = ""): KeyValue => {
  if (isObject(hit)) {
    let ret: KeyValue = {};
    Object.entries(hit).forEach(([key, inner]) => {
      if (!isEmpty(prefix)) ret = { ...ret, [prefix]: hit };
      ret = { ...ret, ..._flatten(inner, prefix ? `${prefix}.${key}` : key) };
    });
    return ret;
  }
  return { [prefix]: hit };
};
const flatten = (hit: AnyObject): KeyValue => {
  if (isObject(hit)) {
    return _flatten(hit);
  }
  return hit;
};

const _get = (hit: AnyObject, field: string): AnyObject => {
  if (isEmpty(hit)) {
    return undefined;
  }

  if (isObject(hit) && field in hit) {
    return hit[field];
  }

  if (field.includes(".")) {
    let currentValue: AnyObject = flatten(hit);

    if (!isNil(currentValue[field])) {
      return currentValue[field];
    }

    const path = field.split(".");
    for (let i = path.length - 1; i >= 0; i--) {
      const outerPath = path.slice(0, i as AnyObject).join(".");
      const innerPath = path.slice(i as AnyObject).join(".");
      if (currentValue[outerPath]) {
        currentValue = currentValue[outerPath];
        if (isArray(currentValue)) {
          return currentValue.map((val) => _get(val, innerPath)).filter((val) => !isEmpty(val));
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
