/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

export type Theme =
  | "default"
  | "activity"
  | "cloud"
  | "qualitative"
  | "diverging"
  | "sequential"
  | "spectral"
  | "uber"
  | "fireice"
  | "warming"
  | "sunrise"
  | "ocean"
  | "ocean"
  | "wine";

export interface BaseChart {
  title?: string;
  theme?: Theme;
}

export interface CountType {
  data: { key: string; label?: string; count: number }[];
}

export interface SeriesType {
  categoryAxisName?: string;
  valueAxisName?: string;
  categories: string[];
  data: { key: string; label?: string; values: number[] }[];
}

export interface TimeSeriesType {
  categoryAxisName?: string;
  valueAxisName?: string;
  data: { key: string; label?: string; values: [Date, number][] }[];
}