/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isEmpty, matchString } from "@axux/utilities";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";

const filterList = (items: AnyObject[], query: string, matcher?: AnyObject) => {
  const newList: AnyObject[] = [];
  items.forEach((item) => {
    if (matcher?.(item, query)) {
      return newList.push(item);
    }
    if (matchString(item.label ?? item.toString(), query)) {
      return newList.push(item);
    }
  });
  return newList;
};

export const useFilteredList = <T extends AnyObject = KeyValue>(
  items: T[],
  matcher?: (item: T, query: string) => boolean
) => {
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState(items);
  const [isSearching, startTransition] = useTransition();

  const search = useDeferredValue(query);

  const filterItems = useCallback(
    (query: string) => {
      if (isEmpty(query)) setFilteredList(items);
      startTransition(() => setFilteredList(filterList(items, query, matcher)));
    },
    [items, matcher]
  );

  useEffect(() => {
    filterItems(search ?? "");
  }, [items, search]);

  const onSearch = useCallback(
    (query?: string) => {
      setQuery(query ?? "");
    },
    [filterItems]
  );

  return { onSearch, search, filteredList, isSearching };
};
