/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxDateDisplay } from "@axux/date";
import { Format, getByPath, isTrue } from "@axux/utilities";
import { memo, useMemo } from "react";
import { useDatagridContext } from "./Context";
import { DatagridColumn } from "./types";

export const BodyCell = memo(
  ({
    name,
    minWidth,
    maxWidth,
    type,
    align,
    format,
    valueMap,
    render,
    record,
  }: DatagridColumn<KeyValue> & KeyValue) => {
    const { widths } = useDatagridContext();

    const width = useMemo(
      () => widths.get(name.toString()) ?? 180,
      [widths, name]
    );

    const content = useMemo(() => {
      const value = getByPath(record, name.toString());
      if (render != null) {
        return render(value, record);
      }
      if (type === "boolean") {
        const map = valueMap ?? { true: "Yes", false: "no" };
        return (map as KeyValue)[`${isTrue(value) ? "true" : "false"}`];
      }
      if (valueMap != null) {
        if (type === "string" && value in valueMap) {
          return (valueMap as KeyValue)[value];
        }
      }
      if (type === "date") {
        return <AxDateDisplay date={value} format={format} />;
      }
      if (type === "number") {
        return Format.number(value, format);
      }
      return value ?? "";
    }, [name, record, render, format, type, valueMap]);

    return (
      <div
        data-name={name}
        data-align={align}
        className="ax-datagrid__body--cell"
        style={{ minWidth, maxWidth, width }}
      >
        <span>{content}</span>
      </div>
    );
  }
);
BodyCell.displayName = "AxDatagrid.BodyCell";
