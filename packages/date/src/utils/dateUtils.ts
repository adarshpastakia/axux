// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import {
  addDays as _addDays,
  addMonths as _addMonths,
  addWeeks as _addWeeks,
  addYears as _addYears,
  endOfDecade as _endOfDecade,
  endOfMonth as _endOfMonth,
  endOfWeek as _endOfWeek,
  endOfYear as _endOfYear,
  format,
  isSameMonth as _isSameMonth,
  isValid,
  startOfDay as _startOfDay,
  startOfDecade as _startOfDecade,
  startOfMonth as _startOfMonth,
  startOfWeek as _startOfWeek,
  startOfYear as _startOfYear
} from "date-fns";
import "./hijri-date";

export const dateFormat = (
  date?: Date,
  fmt = "dd MMM yyyy",
  locale?: KeyValue,
  isHijri?: boolean
) => {
  let formatted = "";
  if (date && isValid(date)) {
    if (isHijri) {
      const hdate = date.toHijri();
      formatted = hdate.format(fmt, {
        locale: locale && locale.code.startsWith("ar") ? "ar" : "en"
      });
    } else {
      formatted = format(date, fmt, { locale });
    }
  }
  if (locale && locale.code.startsWith("ar")) {
    formatted = formatted
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
    hdate.date -= hdate.day;
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

export const endOfMonth = (date: Date, isHijri: boolean) => {
  if (isHijri) {
    const hdate = date.toHijri().ignoreTime();
    hdate.month += 1;
    hdate.date = 1;
    hdate.subtractDay();
    return hdate.toGregorian();
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
    return hdate.toGregorian();
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
    return hdate.toGregorian();
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
    return hdate.toGregorian();
  } else {
    return _endOfDecade(date);
  }
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

export const addDays = (date: Date, d: number, isHijri: boolean) => {
  if (isHijri) {
    const hdate = date.toHijri().ignoreTime();
    hdate.date += d;
    return hdate.toGregorian();
  } else {
    return _addDays(date, d);
  }
};

export const addWeeks = (date: Date, d: number, isHijri: boolean) => {
  if (isHijri) {
    const hdate = date.toHijri().ignoreTime();
    hdate.date += d * 7;
    return hdate.toGregorian();
  } else {
    return _addWeeks(date, d);
  }
};

export const addMonths = (date: Date, d: number, isHijri: boolean) => {
  if (isHijri) {
    const hdate = date.toHijri().ignoreTime();
    hdate.month += d;
    return hdate.toGregorian();
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

export const getWeek = (date: Date, isHijri: boolean) => {
  if (isHijri) {
    const start = startOfYear(date, isHijri);
    return dateFormat(new Date(date.getTime() - start.getTime()), "ww");
  } else {
    return dateFormat(date, "ww");
  }
};
