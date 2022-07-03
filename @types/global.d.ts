/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

declare type Key = string | number | Symbol;
declare type AnyObject = any;
declare type KeyValue<T = AnyObject> = Record<Key, T>;

declare module "*.md" {
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
  subtractDay: () => HDate;

  day: number;
  date: number;
  month: number;
  year: number;
}

declare interface Date {
  toHijri: () => HDate;
}