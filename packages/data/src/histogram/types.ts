// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Color, ColorPalette, ElementProps } from "@axux/core/dist/types";

export interface HistogramRecord {
  group?: string;
  label: string;
  count: number;
  color?: Color | ColorPalette;
}

export interface HistogramProps extends ElementProps {
  data: [group: string, records: HistogramRecord[]][];
  total: number;
  color?: Color | ColorPalette;
  emptyMessage?: string;
}
