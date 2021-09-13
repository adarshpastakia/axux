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
  data: [group: string, records: HistogramRecord[]][];
  total: number;
  color?: Color | ColorPalette;
  emptyDisplay?: JSX.Element;
  isLoading?: boolean;
  onClick?: (record: HistogramRecord) => void;
}
