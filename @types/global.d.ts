// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type AnyObject = any;
declare type KeyValue<T = AnyObject> = Record<string, T>;

declare module "*.md" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
declare module "*.png" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
declare module "*.svg" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
declare module "*.html" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
declare module "*.json" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

interface HDate extends Date {
  toGregorian: () => Date;
  ignoreTime: () => HDate;
  format: (mask: string, options: { locale: string }) => string;

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
