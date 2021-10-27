// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Color, ColorPalette, ElementProps } from "@axux/core/dist/types";

export interface HistogramRecord {
  label: string;
  count: number;
  color?: Color | ColorPalette;
  record?: KeyValue;
}

export interface HistogramProps extends ElementProps {
  data: HistogramRecord[];
  total: number;
  color?: Color | ColorPalette;
  emptyDisplay?: JSX.Element;
  isLoading?: boolean;
  format?: "percent" | "number";
  onClick?: (record: HistogramRecord) => void;
}
