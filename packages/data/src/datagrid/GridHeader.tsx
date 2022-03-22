// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { VFC } from "@axux/core/dist/types";
import { FC } from "react";
import { useGridContext } from "./GridContext";
import { HeaderCell } from "./HeaderCell";

/**
 * Datagrid header row
 * @constructor
 * @internal
 */
export const GridHeader: FC = ({ children }) => {
  const { columns } = useGridContext();
  return (
    <div className="ax-grid__header">
      {columns.map((column, index) => (
        <HeaderCell key={index} {...column} />
      ))}
      {children}
    </div>
  );
};