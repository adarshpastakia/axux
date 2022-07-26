/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { IconProp } from "@axux/core/dist/types";
import { ReactNode } from "react";

export interface DatagridColumn<T> extends IconProp {
  name: keyof T;
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
  render?: (value: AnyObject, record: T) => ReactNode;
}
