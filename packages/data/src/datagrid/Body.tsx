/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { memo } from "react";
import { BodyCell } from "./BodyCell";
import { BodyRow } from "./BodyRow";
import { useDatagridContext } from "./Context";

export const Body = memo(() => {
  const { data, columns } = useDatagridContext();

  return (
    <div className="ax-datagrid__body">
      {data.map((record, row) => (
        <BodyRow key={row} record={record} />
      ))}

      <div className="ax-datagrid__row flex-1">
        <div className="ax-datagrid__row--flex min-h-full">
          {columns.map(({ name }, column) => (
            <BodyCell
              key={column}
              record={{}}
              label=""
              type="string"
              name={name}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
