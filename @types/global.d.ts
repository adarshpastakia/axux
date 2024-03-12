/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

declare type Key = string | number | symbol;
declare type AnyObject = any;
declare type KeyValue<T = AnyObject> = Record<Key, T>;

declare module "*.md" {
  const content: any;
  export default content;
}
declare module "*.mp3" {
  const content: any;
  export default content;
}
declare module "*.mp4" {
  const content: any;
  export default content;
}
declare module "*.png" {
  const content: any;
  export default content;
}
declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.html" {
  const content: any;
  export default content;
}
declare module "*.json" {
  const content: any;
  export default content;
}

interface HDate extends Date {
  toGregorian: () => Date;
  ignoreTime: () => HDate;
  format: (mask: string, options?: { locale?: string }) => string;

  addDay: () => HDate;
  addDays: (d: number) => HDate;
  subtractDay: () => HDate;
  subtractDays: (d: number) => HDate;

  day: number;
  date: number;
  month: number;
  year: number;
}

declare interface Date {
  toHijri: () => HDate;
}
