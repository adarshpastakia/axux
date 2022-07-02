/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isArray, isEmpty, isNil, isObject } from "./_isType";

const _get = (hit: AnyObject, field: string): AnyObject => {
  /******************* return if object is empty *******************/
  if (isNil(hit)) {
    return undefined;
  }
  /******************* return object if property is empty *******************/
  if (isNil(field)) {
    return hit;
  }

  if (isObject(hit)) {
    /******************* return value if object.property is not empty *******************/
    if (!isNil(hit[field])) {
      return hit[field];
    }

    /******************* if property name contains `.` separator split to multiple property names *******************/
    if (field.includes(".")) {
      let currentValue: AnyObject = hit;

      const path = field.split(".");
      for (let i = path.length - 1; i >= 0; i--) {
        /******************* when property name is `a.b.c` iterate until property found in object. eg. `a`, `a.b` *******************/
        const outerPath = path.slice(0, i as AnyObject).join(".");

        /******************* join rest of property list *******************/
        const innerPath = path.slice(i as AnyObject).join(".");

        /******************* if current outer path found in object *******************/
        if (outerPath in currentValue) {
          currentValue = currentValue[outerPath];

          /******************* check for type array *******************/
          if (isArray(currentValue)) {
            /******************* return value if remaining path found *******************/
            if (currentValue[innerPath as AnyObject]) {
              return currentValue[innerPath as AnyObject];
            }
            /******************* return array map of inner propeties *******************/
            return currentValue
              .map((val) => _get(val, innerPath))
              .filter((val) => !isEmpty(val));
          } else {
            /******************* return value of remaining path *******************/
            return _get(currentValue, innerPath);
          }
        }
      }
    }
  }

  return undefined;
};

/**
 * get property value by path
 * @internal
 */
export const getByPath = <T = AnyObject>(
  obj: KeyValue,
  path: string,
  defaultValue: AnyObject = undefined
): T => {
  /******************* if empty object/path return defaultValue *******************/
  if (isEmpty(obj) || isEmpty(path)) {
    return defaultValue;
  }
  const value = _get(obj, path);
  if (!isNil(value)) {
    return value;
  }
  return defaultValue;
};

/**
 * get first available value in list
 * @internal
 */
export const getValue = (...args: AnyObject[]) => {
  return args.find((a) => !isEmpty(a));
};
