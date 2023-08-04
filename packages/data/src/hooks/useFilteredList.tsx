/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { matchString } from "@axux/utilities";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";

const filterList = (
  items: AnyObject[],
  query: string,
  extraQuery = {},
  matcher?: AnyObject
) => {
  const newList: AnyObject[] = [];
  items.forEach((item) => {
    if (matcher) {
      return matcher?.(item, query, extraQuery) && newList.push(item);
    }
    if (matchString(item.label ?? item.toString(), query)) {
      return newList.push(item);
    }
  });
  return newList;
};

export const useFilteredList = <T extends AnyObject = KeyValue>(
  items: T[],
  matcher?: (item: T, query: string, extra?: KeyValue) => boolean
) => {
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState(items);
  const [isSearching, startTransition] = useTransition();

  const [extraQuery, setExtraQuery] = useState<KeyValue>({});

  const search = useDeferredValue(query);

  const filterItems = useCallback(
    (query: string, extraQuery = {}) => {
      startTransition(() =>
        setFilteredList(filterList(items, query, extraQuery, matcher))
      );
    },
    [items, matcher]
  );

  useEffect(() => {
    filterItems(search ?? "", extraQuery);
  }, [items, search, extraQuery]);

  const onSearch = useCallback(
    (query?: string) => {
      setQuery(query ?? "");
    },
    [filterItems]
  );

  return { onSearch, setExtraQuery, search, filteredList, isSearching };
};
