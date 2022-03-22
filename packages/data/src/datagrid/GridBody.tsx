// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { VFC } from "@axux/core/dist/types";
import { BodyCell } from "./BodyCell";
import { useGridContext } from "./GridContext";

/**
 * Datagrid body panel
 * @constructor
 * @internal
 */
export const GridBody: VFC = () => {
  const { records, columns, onScroll, isSelectable, onRowSelect } = useGridContext();

  return (
    <div className="ax-grid__body" onScroll={(e) => onScroll(-1 * e.currentTarget.scrollLeft)}>
      {records.map((record, row) => (
        <div
          key={row}
          className="ax-grid__body--row"
          data-hover={isSelectable}
          onClick={() => isSelectable && onRowSelect && onRowSelect(record, row)}
        >
          {columns.map((column, index) => (
            <BodyCell key={index} record={record} {...column} />
          ))}
        </div>
      ))}

      <div className="ax-grid__body--row ax-grid__filler">
        {columns.map((column, index) => (
          <BodyCell key={index} record={{}} type="string" name={column.name} />
        ))}
      </div>
    </div>
  );
};