/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type IconProp } from "@axux/core/dist/types";
import { type ReactNode } from "react";

export interface DatagridRef {
  hilight: (row: number) => void;
  unhilight: () => void;
  scrollTo: (row: number) => void;
}

export interface DatagridColumn<T> extends IconProp {
  name: keyof T | string;
  label: string;
  tooltip?: true | string;
  valueMap?: KeyValue<ReactNode>;
  type?: "string" | "number" | "date" | "boolean";
  align?: "start" | "center" | "end";
  format?: string;
  isPrimary?: boolean;
  isSortable?: boolean;
  isResizeable?: boolean;
  isLocked?: "start" | "end" | true;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  render?: (value: AnyObject, record: T, row: number) => ReactNode;
}
