/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  addDays as _addDays,
  addMonths as _addMonths,
  addWeeks as _addWeeks,
  addYears as _addYears,
  endOfDay as _endOfDay,
  endOfDecade as _endOfDecade,
  endOfMonth as _endOfMonth,
  endOfWeek as _endOfWeek,
  endOfYear as _endOfYear,
  format as _format,
  isAfter,
  isBefore,
  isSameMonth as _isSameMonth,
  startOfDay as _startOfDay,
  startOfDecade as _startOfDecade,
  startOfMonth as _startOfMonth,
  startOfWeek as _startOfWeek,
  startOfYear as _startOfYear,
} from "date-fns";
import { DateLike, PageType } from "../types";
import { parseDate } from "./dateMath";
import "./hijri-date";

import {
  arSA as ar,
  de,
  enUS as en,
  es,
  fr,
  hi,
  it,
  ja,
  ko,
  pt,
  ru,
  zhCN as zh,
} from "date-fns/locale";

const Locales: KeyValue = {
  ar,
  en,
  de,
  es,
  fr,
  hi,
  it,
  ja,
  ko,
  pt,
  ru,
  zh,
};

export namespace DateUtil {
  const translateNumber = (d: string) => {
    return d
      .replace(/0/g, "٠")
      .replace(/1/g, "١")
      .replace(/2/g, "٢")
      .replace(/3/g, "٣")
      .replace(/4/g, "٤")
      .replace(/5/g, "٥")
      .replace(/6/g, "٦")
      .replace(/7/g, "٧")
      .replace(/8/g, "٨")
      .replace(/9/g, "٩");
  };

  const formatGregorian = (dt: Date, fmt = "", loc = "en") => {
    const ret = _format(dt, fmt, {
      locale: Locales[loc] ?? Locales.en,
    });
    return loc && loc === "ar" ? translateNumber(ret) : ret;
  };
  const formatHijri = (dt: Date, fmt = "", loc = "en") => {
    const hdate = dt.toHijri();
    const ret = hdate.format(fmt, {
      locale: loc,
    });
    return loc && loc === "ar" ? translateNumber(ret) : ret;
  };

  const addHijriDays = (dt: Date, d: number) => {
    const hdate = dt.toHijri().ignoreTime();
    if (d < 0) {
      return hdate.subtractDays(d);
    } else {
      return hdate.addDays(d);
    }
  };

  const addHijriMonth = (dt: Date, d: number) => {
    const hdate = dt.toHijri().ignoreTime();
    if (hdate.month + d > 12) {
      hdate.year += 1;
      hdate.month = 1;
    } else if (hdate.month + d < 1) {
      hdate.year -= 1;
      hdate.month = 12;
    } else {
      hdate.month += d;
    }
    return hdate;
  };

  export const format = (
    date?: DateLike,
    fmt = "dd MMM yyyy",
    locale?: string,
    isHijri?: boolean
  ) => {
    let formatted = "";
    const loc = locale?.split("-")[0] ?? "en";
    const dt = parseDate(date as AnyObject);
    if (dt) {
      formatted = isHijri
        ? formatHijri(dt, fmt, locale)
        : formatGregorian(dt, fmt, locale);
    }
    return formatted;
  };

  export const startOfDay = (date: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      return hdate.toGregorian();
    } else {
      return _startOfDay(date);
    }
  };

  export const startOfWeek = (date: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      hdate.subtractDays(hdate.day);
      return hdate.toGregorian();
    } else {
      return _startOfWeek(date);
    }
  };

  export const startOfMonth = (date: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      hdate.date = 1;
      return hdate.toGregorian();
    } else {
      return _startOfMonth(date);
    }
  };

  export const startOfYear = (date: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      hdate.date = 1;
      hdate.month = 1;
      return hdate.toGregorian();
    } else {
      return _startOfYear(date);
    }
  };

  export const startOfDecade = (date: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      hdate.date = 1;
      hdate.month = 1;
      hdate.year -= hdate.year % 10;
      return hdate.toGregorian();
    } else {
      return _startOfDecade(date);
    }
  };

  export const startOfCentury = (date: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      hdate.date = 1;
      hdate.month = 1;
      hdate.year -= hdate.year % 100;
      return hdate.toGregorian();
    } else {
      return _addYears(date, -1 * (date.getFullYear() % 100));
    }
  };

  export const endOfDay = (date: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      return _endOfDay(hdate.toGregorian());
    } else {
      return _endOfDay(date);
    }
  };

  export const endOfWeek = (date: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      hdate.addDays(6 - hdate.day);
      return _endOfDay(hdate.toGregorian());
    } else {
      return _endOfWeek(date);
    }
  };

  export const endOfMonth = (date: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      hdate.month += 1;
      hdate.date = 1;
      hdate.subtractDay();
      return _endOfDay(hdate.toGregorian());
    } else {
      return _endOfMonth(date);
    }
  };

  export const endOfYear = (date: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      hdate.year += 1;
      hdate.month = 1;
      hdate.date = 1;
      hdate.subtractDay();
      return _endOfDay(hdate.toGregorian());
    } else {
      return _endOfYear(date);
    }
  };

  export const endOfDecade = (date: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      hdate.year += 10 - (hdate.year % 10);
      hdate.month = 1;
      hdate.date = 1;
      hdate.subtractDay();
      return _endOfDay(hdate.toGregorian());
    } else {
      return _endOfDecade(date);
    }
  };

  export const endOfCentury = (date: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      hdate.year += 100 - (hdate.year % 100);
      hdate.month = 1;
      hdate.date = 1;
      hdate.subtractDay();
      return _endOfDay(hdate.toGregorian());
    } else {
      return _endOfDecade(date);
    }
  };

  export const addDays = (date: Date, d: number, isHijri: boolean) => {
    if (isHijri) {
      return addHijriDays(date, d).toGregorian();
    } else {
      return _addDays(date, d);
    }
  };

  export const addWeeks = (date: Date, d: number, isHijri: boolean) => {
    if (isHijri) {
      return addHijriDays(date, d * 7).toGregorian();
    } else {
      return _addWeeks(date, d);
    }
  };

  export const addMonths = (date: Date, d: number, isHijri: boolean) => {
    if (isHijri) {
      return addHijriMonth(date, d).toGregorian();
    } else {
      return _addMonths(date, d);
    }
  };

  export const addYears = (date: Date, d: number, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      hdate.year += d;
      return hdate.toGregorian();
    } else {
      return _addYears(date, d);
    }
  };

  export const getWeek = (date: Date, locale: string, isHijri: boolean) => {
    let ret = "";
    if (isHijri) {
      const start = startOfYear(date, isHijri);
      ret = format(new Date(date.getTime() - start.getTime()), "ww");
    } else {
      ret = format(date, "ww");
    }
    if (locale === "ar") {
      return translateNumber(ret);
    }
    return ret;
  };

  export const isSameMonth = (date: Date, compare: Date, isHijri: boolean) => {
    if (isHijri) {
      const hdate = date.toHijri().ignoreTime();
      const hcompare = compare.toHijri().ignoreTime();
      return hdate.month === hcompare.month;
    } else {
      return _isSameMonth(date, compare);
    }
  };

  export const isDisabled = (
    date: Date,
    page: PageType,
    min?: Date,
    max?: Date
  ) => {
    let methods = [_startOfDay, _endOfDay];
    if (page === PageType.MONTH) {
      methods = [_startOfMonth, _endOfMonth];
    } else if (page === PageType.YEAR) {
      methods = [_startOfYear, _endOfYear];
    } else if (page === PageType.DECADE) {
      methods = [_startOfDecade, _endOfDecade];
    }
    const [start, end] = methods;
    return (
      (!!min && isBefore(start(date), start(min))) ||
      (!!max && isAfter(end(date), end(max)))
    );
  };
}
