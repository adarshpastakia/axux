/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { memo } from "react";
import { BodyRow } from "./BodyRow";
import { useDatagridContext } from "./Context";
import { EmptyRow } from "./EmptyRow";

export const Body = memo(() => {
  const { data } = useDatagridContext();

  return (
    <div className="ax-datagrid__body">
      {data.map((record, row) => (
        <BodyRow key={row} record={record} />
      ))}

      <EmptyRow />
    </div>
  );
});
