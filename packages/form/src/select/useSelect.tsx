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
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { BaseSelectProps, getLabel } from "./utils";

export const useSelect = ({
  options,
  labelProperty,
  onQuery,
  onCreateOption,
}: BaseSelectProps<AnyObject>) => {
  const originalList = useRef<AnyObject[]>(options);
  const [list, setList] = useState<AnyObject[]>(options);
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    originalList.current = options;
  }, [options]);

  const createOption = useCallback(() => {
    originalList.current = [...originalList.current, query];
    setList(originalList.current);
    onCreateOption && startTransition(() => onCreateOption(query));
    return query as AnyObject;
  }, [query]);

  /******************* options flat list *******************/
  const flatList = useMemo(
    () => originalList.current.map((option) => option.items ?? option).flat(2),
    [originalList.current]
  );

  /******************* filter list *******************/
  const onQueryChange = useCallback(
    (query: string) => {
      setQuery(query);
      if (isEmpty(query)) return setList(originalList.current ?? []);

      const filteredList: AnyObject[] = [];
      originalList.current.forEach((option) => {
        if (option.items) {
          const items = option.items.filter((item: AnyObject) =>
            matchString(getLabel(item, labelProperty), query)
          );
          items.length > 0 && filteredList.push({ label: option.label, items });
        }
        matchString(getLabel(option, labelProperty), query) &&
          filteredList.push(option);
      });
      setList(filteredList);
    },
    [labelProperty, onQuery]
  );

  return { list, flatList, query, createOption, onQueryChange };
};
