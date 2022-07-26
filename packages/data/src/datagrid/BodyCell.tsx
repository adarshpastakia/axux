/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxDateDisplay } from "@axux/date";
import { Format, isTrue } from "@axux/utilities";
import { memo, useMemo } from "react";
import { useDatagridContext } from "./Context";
import { DatagridColumn } from "./types";

const KEY =
  "M4 6.5C4 4 6 2 8.5 2S13 4 13 6.5C13 8.46 11.75 10.13 10 10.74V15H13V18H10V22H7V10.74C5.25 10.13 4 8.46 4 6.5M7 6.5C7 7.33 7.67 8 8.5 8S10 7.33 10 6.5 9.33 5 8.5 5 7 5.67 7 6.5";

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
      const value = record[name.toString()];
      if (render) {
        return render(value, record);
      }
      if (type === "boolean") {
        const map = valueMap ?? { true: "Yes", false: "no" };
        return (map as KeyValue)[`${isTrue(value)}`];
      }
      if (valueMap) {
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
        <label>{content}</label>
      </div>
    );
  }
);
