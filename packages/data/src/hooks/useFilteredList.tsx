/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isEmpty, matchString } from "@axux/utilities";
import { useCallback, useState, useTransition } from "react";

const filterList = (items: AnyObject[], query: string, matcher?: AnyObject) => {
  const newList: AnyObject[] = [];
  items.forEach((item) => {
    if (matcher && matcher(item, query)) {
      return newList.push(item);
    }
    if (matchString(item.label ?? item.toString(), query)) {
      return newList.push(item);
    }
  });
  return newList;
};

export const useFilteredList = <T extends KeyValue = AnyObject>(
  items: T[],
  matcher?: (item: T, query: string) => boolean
) => {
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState(items);
  const [isSearching, startTransition] = useTransition();

  const filterItems = useCallback(
    (query: string) => {
      if (isEmpty(query)) setFilteredList(items);
      setFilteredList(filterList(items, query, matcher));
    },
    [items, matcher]
  );

  const onSearch = useCallback(
    (query?: string) => {
      setSearch(query ?? "");
      startTransition(() => filterItems(query ?? ""));
    },
    [filterItems]
  );

  return { search, onSearch, filteredList, isSearching };
};
