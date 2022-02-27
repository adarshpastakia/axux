// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

export enum PageType {
  DATE,
  MONTH,
  YEAR,
  DECADE
}

interface BaseProps {
  min?: Date;
  max?: Date;
  format?: string;
  hijriCalendar?: boolean;
  showHijriToggle?: boolean;
  onHijriChange?: (b: boolean) => void;
}

export interface DateProps extends BaseProps {
  date?: Date;
  onChange?: (date?: Date) => void;
  dateDisabled?: (date: Date) => boolean;
}

export interface RangeProps extends BaseProps {
  date?: [Date, Date];
  onChange?: (date?: [Date, Date]) => void;
  presets?: { [label: string]: [Date, Date] };
}

export interface DateContext {
  page: PageType;
  start?: Date;
  end?: Date;
  selected?: Date;
  pageDate: Date;
  isHijri: boolean;
  changePage: () => void;
  changePageDate: (diff: number) => void;
  selectDate: (dt: Date) => void;
  selectPage: (dt: Date) => void;
  dateDisabled: (dt: Date) => boolean;
  headDisabled: (diff: number) => boolean;
}

// Relative date
export enum Type {
  QUICK = "QUICK",
  RELATIVE = "RELATIVE",
  ABSOLUTE = "ABSOLUTE",
  EVENTS = "EVENTS"
}

export enum DateParts {
  NOW = "$now",
  MINUTE = "$minute",
  HOUR = "$hour",
  DAY = "$day",
  WEEK = "$week",
  MONTH = "$month",
  QUARTER = "$quarter",
  YEAR = "$year",
  DECADE = "$decade"
}

export interface DatePart {
  diff?: number | undefined;
  op?: string | undefined;
  part?: DateParts;
}

export type DateLike = string | number | Date;
export type DateValue = string | number | undefined;
export type ParsedDate = Date | undefined;

export type CalendarEvent = {
  icon: string;
  label: string;
  start: string | number;
  end: string | number;
};

export interface RelativeProps extends Omit<BaseProps, "min" | "max"> {
  date?: string;
  type?: "button" | "tag";
  defaultView?: Type.QUICK | Type.RELATIVE | Type.ABSOLUTE;
  presets?: { [label: string]: string };
  events?: { [year: string]: CalendarEvent[] };
  onChange?: (date?: string, dates?: [ParsedDate, ParsedDate]) => void;
}
