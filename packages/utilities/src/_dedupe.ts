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
    list.reduce<KeyValue>((r, c) => ({ ...r, [key ? c[key] : c]: c }), {})
  );
  return ret.filter((i) => !isEmpty(i));
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
  missingKey?: string
): KeyValue<T[]> => {
  return list.reduce((r, i) => {
    const key = i[prop] ?? missingKey;
    if (!r[key]) r[key] = [];
    r[key].push(i);
    return r;
  }, {});
};
