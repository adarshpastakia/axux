/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { isEmpty } from "./_isType";

export const dedupe = (list: AnyObject[], key?: string) => {
  const filtered = list.filter((i) => !isEmpty(i));
  if (!key) {
    return Array.from(new Set(filtered).values());
  }

  return Array.from(new Map(filtered.map((obj) => [obj[key], obj])).values());
};

export const flatten = (list: AnyObject[]) => {
  return list.flat(5).filter((i) => !isEmpty(i));
};

export const flattenAndDedupe = (list: AnyObject[] = [], key?: string) => {
  return dedupe(flatten(list), key);
};

export const groupBy = <T extends KeyValue>(
  list: KeyValue[],
  prop: string,
  missingKey?: string,
): KeyValue<T[]> => {
  return list.reduce((r, i) => {
    const key = i[prop] ?? missingKey;
    if (!r[key]) r[key] = [];
    r[key].push(i);
    return r;
  }, {});
};
