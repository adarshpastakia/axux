// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isTrue } from "@axux/utilities";
import { useMemo, VFC } from "react";
import { useGridContext } from "./GridContext";
import { GridColumn } from "./types";

/**
 * Data cell
 * @param record
 * @param name
 * @param type
 * @param align
 * @param minWidth
 * @param maxWidth
 * @param valueMap
 * @param render
 * @constructor
 * @internal
 */
export const BodyCell: VFC<GridColumn & { record: KeyValue }> = ({
  record,
  name,
  type = "string",
  align,
  minWidth = "2rem",
  maxWidth,
  valueMap,
  render
}) => {
  const { widths } = useGridContext();

  const content = useMemo(() => {
    const value = record[name];
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
    return value ?? "";
  }, [name, record, render, type, valueMap]);

  return (
    <div
      data-align={align}
      className="ax-grid__body--cell"
      style={{ flex: widths[name] ? `0 0 ${widths[name]}` : undefined, minWidth, maxWidth }}
    >
      <label>{content}</label>
    </div>
  );
};
