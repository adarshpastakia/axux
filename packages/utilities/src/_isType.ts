// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

export const isUndefined = (value: AnyObject): value is undefined => {
  return value === undefined;
};

export const isNull = (value: AnyObject): value is null => {
  return value === null;
};

export const isNil = (val: AnyObject): val is undefined => {
  return val === undefined || val === null;
};
export const isEmpty = (val: AnyObject): val is undefined => {
  if (isNil(val) || val === "") {
    return true;
  }
  if (Array.isArray(val) && val.length === 0) {
    return true;
  }
  if (val instanceof Map || val instanceof Set) return val.size === 0;
  if (["boolean", "number", "bigint", "function"].includes(typeof val)) {
    return false;
  }
  return typeof val === "object" && Object.entries(val).length === 0;
};

export const isObject = (val: AnyObject): val is KeyValue => {
  return !isNil(val) && !(val instanceof Date) && typeof val === "object" && !Array.isArray(val);
};
export const isArray = <T = AnyObject>(val: AnyObject): val is T[] => {
  return Array.isArray(val);
};

export const isString = (value: AnyObject): value is string => {
  return typeof value === "string";
};

export const isNumber = (value: AnyObject): value is number => {
  return typeof value === "number";
};

export const isBoolean = (value: AnyObject): value is boolean => {
  return typeof value === "boolean";
};
export const isTrue = (value: AnyObject = ""): value is true => {
  return (
    value === true ||
    value === 1 ||
    value.toString().toLowerCase() === "yes" ||
    value.toString().toLowerCase() === "true"
  );
};
export const isFalse = (value: AnyObject = ""): value is false => {
  return (
    value === false ||
    value === 0 ||
    value.toString().toLowerCase() === "no" ||
    value.toString().toLowerCase() === "false"
  );
};

export const isColor = (color: string) => color.startsWith("#") || color.startsWith("rgb");

export const isSvgPath = (value: AnyObject): value is string => {
  return typeof value === "string" && value.match(/^[Mm]\d.*[\dzZ]$/) !== null;
};

export const isRtl = () => {
  return getComputedStyle(document.documentElement).direction === "rtl";
};
