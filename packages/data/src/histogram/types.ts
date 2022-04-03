// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Color, ColorPalette, ElementProps } from "@axux/core/dist/types";

export interface HistogramRecord {
  id: number | string;
  label: string;
  count: number;
  include?: boolean;
  color?: Color | ColorPalette;
  record?: KeyValue;
}

export interface HistogramProps extends Omit<ElementProps, "onClick"> {
  data: HistogramRecord[];
  total: number;
  color?: Color | ColorPalette;
  positiveColor?: Color | ColorPalette;
  negativeColor?: Color | ColorPalette;
  emptyDisplay?: JSX.Element;
  isLoading?: boolean;
  format?: "percent" | "number";
  allowNegate?: boolean;
  onClick?: (record: HistogramRecord, include?: boolean) => void;
}
