/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { AxField } from "@axux/form";
import { FC } from "react";
import { SearchProps } from "../types";
import { Icons } from "../types/icons";
import { FilterButton } from "./FilterButton";
import { SearchButton } from "./SearchButton";
import { SearchInput } from "./SearchInput";

export const SearchWrapper: FC<Partial<SearchProps>> = ({
  append,
  prepend,
  actions,
  hideFilters,
}) => {
  return (
    <div className="ax-searchbar">
      <AxField.Container>
        {!hideFilters && <FilterButton />}
        {prepend}
        <SearchInput />
        <SearchButton />
      </AxField.Container>
      {append}
      {actions && (
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
