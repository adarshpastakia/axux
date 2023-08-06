/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isString, matchString } from "@axux/utilities";
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
  const [filteredList, setFilteredList] = useState(items);
  const [isSearching, startTransition] = useTransition();

  const search = useDeferredValue(query);

  const filterItems = useCallback(
    (query?: Q) => {
      startTransition(() => setFilteredList(filterList(items, query, matcher)));
    },
    [items, matcher]
  );

  useEffect(() => {
    filterItems(search);
  }, [items, search]);

  const onSearch = useCallback(
    (query?: Q) => {
      setQuery(query);
    },
    [filterItems]
  );

  return { onSearch, search, filteredList, isSearching };
};
