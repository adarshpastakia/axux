/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { debounce } from "@axux/utilities";
import {
  type FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Addon } from "./Addon";
import { Text, type TextProps } from "./Text";

export interface SearchProps
  extends Omit<TextProps, "type" | "allowClear" | "onEnterPressed"> {
  icon?: string;
  defaultValue?: string;
  isSearching?: boolean;
  /**
   * search callback
   */
  onSearch?: (query?: string) => void;
}

// eslint-disable-next-line react/display-name
export const Search: FC<SearchProps> = memo(
  ({
    children,
    icon,
    isSearching,
    onChange,
    onSearch,
    value,
    defaultValue,
    ...props
  }: SearchProps) => {
    const [query, setQuery] = useState(defaultValue);
    const [, startTransition] = useTransition();

    useEffect(() => {
      setQuery(value ?? "");
    }, [value]);

    const handleSearch = useMemo(
      () => debounce((q) => onChange?.(q), 200),
      [onChange]
    );

    const handleChange = useCallback(
      (value?: string) => {
        setQuery(value);
        startTransition(() => {
          handleSearch(value);
        });
      },
      [handleSearch]
    );
    const handleQuery = useCallback(() => {
      startTransition(() => {
        onSearch?.(query);
      });
    }, [query]);

    return (
      <Text
        {...props}
        allowClear
        type="search"
        value={query}
        onChange={handleChange}
        onEnterPressed={handleQuery}
      >
        <Addon
          showSpinner={isSearching}
          icon={icon ?? AppIcons.iconFilter}
          className="text-muted"
        />
        {children}
        <Addon align="end">
          <AxButton
            variant="link"
            noTabFocus
            icon={AppIcons.iconSearch}
            onClick={handleQuery}
          />
        </Addon>
      </Text>
    );
  }
);
