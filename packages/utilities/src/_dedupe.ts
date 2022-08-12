/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isEmpty } from "./_isType";

export const dedupe = (list: AnyObject[], key?: string) => {
  const ret = Object.values(
    list.reduce<KeyValue>(
      (r, c) => ({ ...r, [key ? c[key] : c]: c }),
      {}
    )
  );
  return ret.filter(Boolean);
};

export const flatten = (list: AnyObject[]) => {
  return list.flat(5).filter((i) => !isEmpty(i));
};

export const flattenAndDedupe = (list: AnyObject[] = [], key?: string) => {
  return dedupe(flatten(list), key);
};
