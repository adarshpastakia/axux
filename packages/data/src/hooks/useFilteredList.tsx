/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { debounce, isString, matchString } from "@axux/utilities";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";

const filterList = (
  items: AnyObject[],
  query: AnyObject = "",
  matcher?: AnyObject
) => {
  const newList: AnyObject[] = [];
  items.forEach((item) => {
    if (matcher) {
      return matcher?.(item, query) && newList.push(item);
    }
    if (query && isString(query)) {
      if (matchString(item.label ?? item.toString(), query)) {
        return newList.push(item);
      }
    } else {
      return newList.push(item);
    }
  });
  return newList;
};

export const useFilteredList = <
  T extends AnyObject = KeyValue,
  Q extends AnyObject = string
>(
  items: T[],
  matcher?: (item: T, query: Q) => boolean
) => {
  const [query, setQuery] = useState<Q>();
  const _items = useDeferredValue(items ?? []);
  const [filteredList, setFilteredList] = useState<T[]>([]);
  const [isSearching, startTransition] = useTransition();

  const filterItems = useCallback(
    debounce(
      (items: T[], query?: Q) =>
        startTransition(() =>
          setFilteredList(filterList(items, query, matcher))
        ),
      250
    ),
    []
  );

  useEffect(() => {
    filterItems(_items, query);
  }, [query, _items]);

  const onSearch = useCallback(
    debounce((query?: Q) => {
      setQuery(query);
    }, 250),
    []
  );

  return { onSearch, search: query, filteredList, isSearching };
};
