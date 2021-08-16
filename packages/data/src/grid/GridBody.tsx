// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { VFC } from "react";
import { BodyCell } from "./BodyCell";
import { useGridContext } from "./GridContext";

/**
 * Datagrid body panel
 * @constructor
 * @internal
 */
export const GridBody: VFC = () => {
  const { records, columns, onScroll } = useGridContext();

  return (
    <div className="ax-grid__body" onScroll={(e) => onScroll(-1 * e.currentTarget.scrollLeft)}>
      {records.map((record, row) => (
        <div key={row} className="ax-grid__body--row">
          {columns.map((column, index) => (
            <BodyCell key={index} record={record} {...column} />
          ))}
        </div>
      ))}

      <div className="ax-grid__body--row ax-grid__filler">
        {columns.map((column, index) => (
          <BodyCell key={index} record={{}} {...column} />
        ))}
      </div>
    </div>
  );
};
