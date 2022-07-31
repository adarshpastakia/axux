/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ChildrenProp } from "@axux/core/dist/types";
import i18next from "i18next";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { I18nextProvider } from "react-i18next";
import {
  EnumFieldType,
  FilterField,
  FilterObject,
  FilterProps,
  QueryOption,
  SearchProps,
} from "../types";

interface Context {
  defaultQueryList: QueryOption[];

  isDirty: boolean;

  query: string;
  history: string[];
  updateQuery: (q: string) => void;

  showFilters: boolean;
  setShowFilters: (b: boolean) => void;

  fields: FilterField[];
  filters: FilterObject[];

  onQuery: SearchProps["onQuery"];

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

export const SearchContextProvider: React.FC<
  Partial<SearchProps & FilterProps> & ChildrenProp
> = ({
  children,
  query: _query = "",
  filters: _filters = [],
  historyCount = 20,
  defaultQueryList = [],
  isCollapsed = false,
  fields = [],
  onQuery,
  onSearch,
  onFilterChanged,
}) => {
  const [query, setQuery] = useState(_query);
  const [filters, setFilters] = useState(_filters);
  const [isDirty, setDirty] = useState(false);
  const [showFilters, setShowFilters] = useState(!isCollapsed);

  const [history, setHistory] = useState<string[]>([]);

  // useEffect(() => {
  //   onSearch?.({ query, filters });
  // }, [query, filters]);

  const handleSearch = useCallback(() => {
    setDirty(false);
    onSearch?.({ query, filters });
  }, [query, filters, onSearch]);

  const updateQuery = (query: string) => {
    setHistory([
      query,
      ...history.filter((h) => h !== query).slice(0, historyCount - 1),
    ]);
    setQuery(query);
    onSearch?.({ query, filters });
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
          history,
          updateQuery,
          onQuery,
          handleSearch,
          updateFilter,
          addFilter,
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
