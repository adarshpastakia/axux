/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type FC } from "react";
import { SearchContextProvider } from "./context";
import { FilterWrapper } from "./filterbar/FilterWrapper";
import { type FilterProps } from "./types";

export const AxFilterBar: FC<FilterProps> = ({ ...props }) => {
  return (
    <SearchContextProvider {...props}>
      <FilterWrapper />
    </SearchContextProvider>
  );
};
