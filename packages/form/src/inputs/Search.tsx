/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { FC, memo, useCallback, useState, useTransition } from "react";
import { Addon } from "./Addon";
import { Text, TextProps } from "./Text";

export interface SearchProps
  extends Omit<
    TextProps,
    "type" | "allowClear" | "onEnterPressed" | "onChange"
  > {
  icon?: string;
  isSearching?: boolean;
  /**
   * Show view password toggle
   */
  onSearch?: (query?: string) => void;
}

export const Search: FC<SearchProps> = memo(
  ({ children, icon, isSearching, onSearch, ...props }) => {
    const [query, setQuery] = useState(props.value);
    const [pending, startTransition] = useTransition();

    const handleChange = useCallback((value?: string) => {
      startTransition(() => {
        setQuery(value);
      });
    }, []);
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
            style="link"
            noTabFocus
            icon={AppIcons.iconSearch}
            onClick={handleQuery}
          />
        </Addon>
      </Text>
    );
  }
);
