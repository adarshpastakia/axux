/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { memo } from "react";
import { useDatagridContext } from "./Context";
import { HeaderCell } from "./HeaderCell";

export const Header = memo(() => {
  const { columns, onRowExpand } = useDatagridContext();

  return (
    <div className="ax-datagrid__header">
      {!!onRowExpand && (
        <div className="ax-datagrid__header--cell px-2">
          <AxIcon icon="" />
        </div>
      )}
      {columns.map((props, index) => (
        <HeaderCell key={index} {...props} />
      ))}
    </div>
  );
});
