/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useLocalStorage } from "@axux/core";
import { ChildrenProp } from "@axux/core/dist/types";
import { SuggestItem } from "@axux/form/dist/select/Suggest";
import i18next from "i18next";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { I18nextProvider } from "react-i18next";
import { FilterField, FilterObject, FilterProps, SearchProps } from "../types";

interface Context {
  defaultQueryList: SuggestItem[];
  onDefaultClick: SearchProps["onDefaultClick"];

  isDirty: boolean;
  isEditable: boolean;

  query: string;
  options: string[];
  handleSelect: (q?: string) => void;
  updateQuery: (q: string) => Promise<SuggestItem[]> | SuggestItem[];

  showFilters: boolean;
  setShowFilters: (b: boolean) => void;

  fields: FilterField[];
  filters: FilterObject[];

  handleSearch: () => void;

  updateFilter: (index: number, filter: Partial<FilterObject>) => void;
  addFilter: (filter: FilterObject) => void;
  removeFilter: (index: number) => void;

  toggleDisable: (disable: boolean) => void;
  toggleExclude: () => void;
  removeAll: () => void;
}

export const SearchContext = React.createContext<Context>({} as AnyObject);

export const useSearchContext = () => useContext(SearchContext);

const blankHistory: AnyObject[] = [];

export const SearchContextProvider: React.FC<
  Partial<SearchProps & FilterProps> & ChildrenProp
> = ({
  children,
  query: _query = "",
  filters: _filters = [],
  historyCount = 20,
  defaultQueryList = [],
  isCollapsed = false,
  isEditable = false,
  fields = [],
  historyKey = "ax:search",
  onQuery,
  onSearch,
  onDefaultClick,
  onFilterChanged,
}) => {
  const [query, setQuery] = useState(_query);
  const [filters, setFilters] = useState(_filters);
  const [isDirty, setDirty] = useState(false);
  const [showFilters, setShowFilters] = useState(!isCollapsed);

  const [isPending, startTransition] = useTransition();
  const [history, setHistory] = useLocalStorage<string[]>(
    historyKey,
    blankHistory
  );
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setFilters(_filters);
  }, [_filters]);

  useEffect(() => {
    setQuery(_query);
  }, [_query]);

  useEffect(() => {
    setOptions(history);
  }, [history]);

  const handleSelect = useCallback(
    (query: string = "") => {
      setDirty(false);
      setQuery(query);
      onSearch?.({ query, filters });
    },
    [filters, onSearch]
  );

  const handleSearch = useCallback(() => {
    setDirty(false);
    !!query &&
      setHistory([
        query,
        ...history.filter((h) => h !== query).slice(0, historyCount - 1),
      ]);
    setQuery(query);
    onSearch?.({ query, filters });
  }, [query, filters, onSearch]);

  const updateQuery = (query: string) => {
    const newHistory = [
      query,
      ...history.filter((h) => h !== query).slice(0, historyCount - 1),
    ];
    setDirty(true);
    startTransition(() => {
      setOptions(newHistory.filter((h) => h.includes(query)));
    });
    return onQuery?.(query) ?? [];
  };

  const updateFilter = (index: number, filter: Partial<FilterObject>) => {
    const newFilters = [...filters];
    const oldFilter = filters[index];
    newFilters.splice(index, 1, {
      ...oldFilter,
      ...filter,
    } as AnyObject);
    setFilters(newFilters);
    onFilterChanged?.(newFilters);
    onSearch?.({ query, filters: newFilters });
  };

  const addFilter = (filter: FilterObject) => {
    const newFilters = [...filters, filter];
    setFilters(newFilters);
    onFilterChanged && onFilterChanged(newFilters);
    onSearch?.({ query, filters: newFilters });
  };

  const removeFilter = (index: number) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
    onFilterChanged && onFilterChanged(newFilters);
    onSearch?.({ query, filters: newFilters });
  };

  const toggleDisable = (value: boolean) => {
    const newFilters = filters.map((f) =>
      f.type === "filter" && f.isRequired ? f : { ...f, isDisabled: value }
    );
    setFilters(newFilters);
    onFilterChanged?.(newFilters);
    onSearch?.({ query, filters: newFilters });
  };

  const toggleExclude = () => {
    const newFilters = filters.map((f) =>
      f.type === "filter"
        ? f.isRequired
          ? f
          : { ...f, isNegative: !f.isNegative }
        : f
    );
    setFilters(newFilters);
    onFilterChanged?.(newFilters);
    onSearch?.({ query, filters: newFilters });
  };

  const removeAll = () => {
    const newFilters = filters.filter(
      (f) => f.type === "filter" && f.isRequired
    );
    setFilters(newFilters);
    onFilterChanged?.(newFilters);
    onSearch?.({ query, filters: newFilters });
  };

  return (
    <I18nextProvider i18n={i18next}>
      <SearchContext.Provider
        value={{
          defaultQueryList,
          showFilters,
          setShowFilters,
          filters,
          isDirty,
          query,
          fields,
          options,
          isEditable,
          handleSelect,
          updateQuery,
          handleSearch,
          updateFilter,
          addFilter,
          onDefaultClick,
          removeFilter,
          toggleDisable,
          toggleExclude,
          removeAll,
        }}
      >
        {children}
      </SearchContext.Provider>
    </I18nextProvider>
  );
};
