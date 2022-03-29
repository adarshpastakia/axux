// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isNil, isNumber, isString } from "@axux/utilities";
import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addQuarters,
  addWeeks,
  addYears,
  endOfDay,
  endOfDecade,
  endOfHour,
  endOfMinute,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  formatDistanceToNowStrict,
  isBefore,
  startOfDay,
  startOfDecade,
  startOfHour,
  startOfMinute,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear
} from "date-fns";
import i18n from "i18next";
import { DateLike, DatePart, DateParts, DateValue, ParsedDate, Type } from "../types";
import { dateFormat } from "./index";

export const I18nKey = "superdate";

/** @internal */
const isDate = (value: AnyObject): value is Date => {
  if (isDateLike(value)) return false;
  if (isString(value) && !value.match(/^(\d*[-/.]\d*[-/.]\d*)?/)) {
    return false;
  }
  if (isNumber(value)) return true;
  if (value.includes?.("ISO") || value.includes?.("UTF")) return false;
  try {
    const parsed = Date.parse(value);
    if (!isNaN(parsed)) return true;
  } catch {
    //
  }
  return false;
};

/** @internal */
const isDateLike = (value: AnyObject) => {
  return (
    isString(value) &&
    !!value.match(/^\$(now|minute|hour|day|week|month|quarter|year|decade)([-+]\d*)?$/)
  );
};

/** @internal */
export const getDateParts = (dt: DateValue): DatePart | undefined => {
  if (isString(dt)) {
    const parts = dt.match(/(\$[\w]*)([-+])?([0-9]+)?/);
    if (parts) {
      const [, part, op = "", diff] = parts as AnyObject;
      return { part: part as DateParts, op, diff: parseInt(diff || "0", 10) };
    }
  }
  return undefined;
};

/** @internal */
export const parseDate = (dt?: string | number, rounded?: "start" | "end"): ParsedDate => {
  if (dt && isDate(dt)) {
    return new Date(dt);
  } else if (dt && isDateLike(dt)) {
    const parts = getDateParts(dt);

    if (parts) {
      const { part, op, diff } = parts;
      const diffNum = parseInt(`${op}${diff}`, 10);
      let date = startOfMinute(new Date());

      switch (part) {
        case DateParts.NOW:
          return date;
        case DateParts.DECADE:
          if (rounded) {
            date = (rounded === "start" ? startOfDecade : endOfDecade)(date);
          }
          return addYears(date, diffNum * 10);
        case DateParts.YEAR:
          if (rounded) {
            date = (rounded === "start" ? startOfYear : endOfYear)(date);
          }
          return addYears(date, diffNum);
        case DateParts.QUARTER:
          if (rounded) {
            date = (rounded === "start" ? startOfQuarter : endOfQuarter)(date);
          }
          return addQuarters(date, diffNum);
        case DateParts.MONTH:
          if (rounded) {
            date = (rounded === "start" ? startOfMonth : endOfMonth)(date);
          }
          return addMonths(date, diffNum);
        case DateParts.WEEK:
          if (rounded) {
            date = (rounded === "start" ? startOfWeek : endOfWeek)(date);
          }
          return addWeeks(date, diffNum);
        case DateParts.DAY:
          if (rounded) {
            date = (rounded === "start" ? startOfDay : endOfDay)(date);
          }
          return addDays(date, diffNum);
        case DateParts.HOUR:
          if (rounded) {
            date = (rounded === "start" ? startOfHour : endOfHour)(date);
          }
          return addHours(date, diffNum);
        case DateParts.MINUTE:
          if (rounded) {
            date = (rounded === "start" ? startOfMinute : endOfMinute)(date);
          }
          return addMinutes(date, diffNum);
      }
    }
  }
  return undefined;
};

/** @internal */
const parseDateValue = (dt: DateValue): [ParsedDate, ParsedDate] | ParsedDate => {
  if (isNil(dt)) {
    return undefined;
  }
  if (isString(dt) && dt.includes("|")) {
    const [startDate, endDate] = dt.split("|");
    return [
      parseDate(startDate, startDate === endDate ? "start" : undefined),
      parseDate(endDate, startDate === endDate ? "end" : undefined)
    ];
  } else {
    return parseDate(dt);
  }
};

/** @internal */
const parseLabel = (dt: string | number, locale?: KeyValue): string => {
  if (isDate(dt)) {
    return dateFormat(new Date(dt), "PP", locale);
  } else if (isDateLike(dt)) {
    const parts = getDateParts(dt);

    if (parts) {
      let retVal;
      const { part, op, diff } = parts;
      const count = parseInt(`${op}${diff}`, 10);
      const t = (k: string, o?: KeyValue) => i18n.t(`${I18nKey}:${k}`, o);
      if (part === DateParts.NOW) {
        retVal = t(`label.${DateParts.NOW}`);
      } else if (count === 0) {
        retVal = t(`now.${part}`);
      } else {
        retVal = t(`${count < 0 ? "prev" : "next"}.${part}`, { count: Math.abs(count) });
      }
      return retVal;
    }
  }
  return "";
};

/** @internal */
export const parseDateLabel = (dt: DateValue, locale?: KeyValue): string => {
  if (isNil(dt)) {
    return "";
  }
  if (isString(dt) && dt.includes("|")) {
    const [startDate, endDate] = dt.split("|");
    return startDate === endDate
      ? parseLabel(startDate, locale)
      : [parseLabel(startDate, locale), parseLabel(endDate, locale)].join(
          ` ${i18n.t(`${I18nKey}:separator`, "→")} `
        );
  } else {
    return parseLabel(dt, locale);
  }
};

/** @internal */
export const makeSuperDate = (start?: DateValue, end?: DateValue) => {
  const startParsed = parseDate(start);
  const endParsed = parseDate(end);
  if (start && end && start && end && startParsed && endParsed) {
    return isBefore(startParsed, endParsed) ? `${start}|${end}` : `${end}|${start}`;
  } else if (start && !end && isString(start)) {
    return start.includes("-") ? `${start}|${DateParts.NOW}` : `${DateParts.NOW}|${start}`;
  }
  return undefined;
};

/** @internal */
export const superDateType = (dt?: string | number): Type => {
  if (isNil(dt)) {
    return Type.QUICK;
  }
  if (isString(dt) && dt.includes("|")) {
    const [startDate, endDate] = dt.split("|");
    if (startDate === endDate) {
      return Type.QUICK;
    } else if ([startDate, endDate].includes(DateParts.NOW)) {
      return Type.QUICK;
    } else if (isDate(startDate)) {
      return Type.ABSOLUTE;
    } else {
      return Type.RELATIVE;
    }
  } else {
    if (isDate(dt)) {
      return Type.ABSOLUTE;
    }
  }
  return Type.QUICK;
};

export const DateUtils = {
  isValid(dt: DateValue): boolean {
    if (isString(dt) && dt.includes("|")) {
      const [start, end] = dt.split("|");
      return ((isDate(start) || isDateLike(start)) && isDate(end)) || isDateLike(end);
    }
    return isDate(dt) || isDateLike(dt);
  },
  parse(dt: DateValue): ParsedDate {
    return parseDateValue(dt) as ParsedDate;
  },
  parseRange(dt: DateValue): [ParsedDate, ParsedDate] {
    return parseDateValue(dt) as [ParsedDate, ParsedDate];
  },
  label(dt: DateValue, locale?: KeyValue): string {
    return parseDateLabel(dt, locale);
  },
  convert(dates: [ParsedDate, ParsedDate] | undefined): string {
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      if (start && end) return `${start.toISOString()}|${end.toISOString()}`;
    }
    return "";
  },
  age(dt: DateLike) {
    const dates = parseDate(dt as AnyObject);
    if (dates && isDate(dates)) {
      return formatDistanceToNowStrict(dates);
    }
  },
  toISOString(dt: DateValue): [DateValue, DateValue] | DateValue {
    const dates = parseDateValue(dt);
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      return [start && start.toISOString(), end && end.toISOString()];
    } else if (dates) {
      return dates.toISOString();
    }
    return undefined;
  },
  toString(dt: DateValue, format = "PPpp", locale?: KeyValue) {
    const dates = parseDateValue(dt);
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      return [
        start && dateFormat(start, format, locale),
        end && dateFormat(end, format, locale)
      ].join(` ${i18n.t(`${I18nKey}:separator`, "→")} `);
    } else if (dates) {
      return dateFormat(dates, format, locale);
    }
    return undefined;
  }
};
