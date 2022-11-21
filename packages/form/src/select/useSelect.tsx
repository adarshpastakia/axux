/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { debounce, isEmpty, matchString } from "@axux/utilities";
import { useCallback, useEffect, useRef, useState } from "react";
import { BaseSelectProps, getLabel } from "./utils";

export const useSelect = ({
  options = [],
  labelProperty,
  onQuery,
}: BaseSelectProps<AnyObject>) => {
  const originalList = useRef<AnyObject[]>([]);
  const [list, setList] = useState<AnyObject[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    originalList.current = options;
    setList(originalList.current);
  }, [options]);

  const handleQuery = useCallback(
    debounce((query: string) => {
      void Promise.resolve(onQuery?.(query)).then(
        (list) => list != null && setList(list)
      );
    }, 200),
    [onQuery]
  );

  /** ***************** filter list *******************/
  const onQueryChange = useCallback(
    (query: string) => {
      setQuery(query);
      if (isEmpty(query)) return setList(originalList.current ?? []);

      if (onQuery != null) {
        return handleQuery(query);
      }

      const filteredList: AnyObject[] = [];
      originalList.current.forEach((option) => {
        if (option.items) {
          const items = option.items.filter((item: AnyObject) =>
            matchString(getLabel(item, labelProperty), query)
          );
          items.length > 0 && filteredList.push({ label: option.label, items });
        } else {
          matchString(getLabel(option, labelProperty), query) &&
            filteredList.push(option);
        }
      });
      setList(filteredList);
    },
    [labelProperty, handleQuery]
  );

  return {
    list,
    query,
    onQueryChange,
  };
};
