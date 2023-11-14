/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { AxField } from "@axux/form";
import { type FC } from "react";
import { type SearchProps } from "../types";
import { Icons } from "../types/icons";
import { FilterButton } from "./FilterButton";
import { SearchButton } from "./SearchButton";
import { SearchInput } from "./SearchInput";
import { useSearchContext } from "../context";

export const SearchWrapper: FC<Partial<SearchProps>> = ({
  append,
  prepend,
  actions,
  hideFilters,
}) => {
  const { isFocused } = useSearchContext();
  return (
    <div className="ax-searchbar">
      <AxField.Container>
        {!isFocused && !hideFilters && <FilterButton />}
        {!isFocused && prepend}
        <SearchInput />
        <SearchButton />
      </AxField.Container>
      {!isFocused && append}
      {!isFocused && actions && (
        <AxButton.Dropdown
          variant="outline"
          showCaret={false}
          icon={Icons.iconMenu}
        >
          {actions}
        </AxButton.Dropdown>
      )}
    </div>
  );
};
