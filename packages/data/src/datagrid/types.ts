// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { IconProps } from "@axux/core/dist/types";

/** @internal */
type DisplayType = string | JSX.Element;

/** @internal */
type DateFilter = { label: string; min?: number; max?: number };
/** @internal */
type NumberFilter = { label: string; min?: number; max?: number };

/** @internal */
interface BaseColumn extends IconProps {
  name: string;
  label?: DisplayType;
  tooltip?: true | DisplayType;

  type?: "string" | "date" | "number" | "boolean";
  align?: "start" | "center" | "end";

  isPrimary?: boolean;
  isSortable?: boolean;
  isResizeable?: boolean;
  isFilterable?: boolean;

  isLocked?: "start" | "end" | true;

  filterOptions?: AnyObject;

  /**
   * Fixed width
   */
  width?: number | string;
  /**
   * Max width
   */
  maxWidth?: number | string;
  /**
   * Min width
   */
  minWidth?: number | string;

  render?: (value: AnyObject, record: KeyValue) => DisplayType;
}

/** @internal */
interface StringColumn extends BaseColumn {
  type: "string";
  valueMap?: KeyValue<DisplayType>;
  filterOptions?: string[];
}

/** @internal */
interface NumberColumn extends BaseColumn {
  type: "number";
  valueMap?: NumberFilter[];
  filterOptions?: NumberFilter[];
}

/** @internal */
interface DateColumn extends BaseColumn {
  type: "date";
  format?: string;
  valueMap?: DateFilter[];
  filterOptions?: DateFilter[];
}

/** @internal */
interface BooleanColumn extends BaseColumn {
  type: "boolean";
  valueMap?: { true: DisplayType; false: DisplayType };
}

/** @internal */
export type GridColumn = StringColumn | NumberColumn | DateColumn | BooleanColumn;

/** @internal */
export interface GridProps<T = KeyValue> {
  data: T[];
  columns: Array<GridColumn>;
  isLoading?: boolean;
  isCheckable?: boolean;
  isSelectable?: boolean;

  emptyDisplay?: JSX.Element;

  onSort?: (column: string, dir: "asc" | "desc") => void;
  onRowSelect?: (record: T, index: number) => void;
}
