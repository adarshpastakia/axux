/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

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
  startOfYear,
} from "date-fns";
import i18n from "i18next";
import { DateLike, DatePart, DateParts, ParsedDate, Type } from "../types";
import { DateUtil } from "./index";

/** @internal */
const isDate = (value: AnyObject, ignoreNumber = false): value is Date => {
  if (isDateLike(value)) return false;
  if (isNumber(value)) return !ignoreNumber;
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
const isDateLike = (value: AnyObject): value is string => {
  return (
    isString(value) &&
    !!value.match(
      /^\$(now|minute|hour|day|week|month|quarter|year|decade)([-+]\d*)?$/
    )
  );
};

/** @internal */
export const getDateParts = (dt: DateLike): DatePart | undefined => {
  if (isString(dt)) {
    const parts = dt.match(/(\$[\w]*)([-+])?([0-9]+)?/);
    if (parts) {
      const [, part, op = "", diff] = parts;
      return { part: part as DateParts, op, diff: parseInt(diff || "0", 10) };
    }
  }
  return undefined;
};

/** @internal */
export const parseDate = (
  dt?: DateLike,
  ordinal?: "start" | "end",
  isRounded = false
): ParsedDate => {
  if (dt && isDate(dt)) {
    return new Date(dt);
  } else if (dt && isDateLike(dt)) {
    const parts = getDateParts(dt);

    if (parts != null) {
      const { part, op = "+", diff = 0 } = parts;
      const diffNum = parseInt(`${op}${diff}`, 10);
      let date = startOfMinute(new Date());

      switch (part) {
        case DateParts.NOW:
          return date;
        case DateParts.DECADE:
          if (isRounded || diff === 0) {
            date = (ordinal === "start" ? startOfDecade : endOfDecade)(date);
          }
          return addYears(date, diffNum * 10);
        case DateParts.YEAR:
          if (isRounded || diff === 0) {
            date = (ordinal === "start" ? startOfYear : endOfYear)(date);
          }
          return addYears(date, diffNum);
        case DateParts.QUARTER:
          if (isRounded || diff === 0) {
            date = (ordinal === "start" ? startOfQuarter : endOfQuarter)(date);
          }
          return addQuarters(date, diffNum);
        case DateParts.MONTH:
          if (isRounded || diff === 0) {
            date = (ordinal === "start" ? startOfMonth : endOfMonth)(date);
          }
          return addMonths(date, diffNum);
        case DateParts.WEEK:
          if (isRounded || diff === 0) {
            date = (ordinal === "start" ? startOfWeek : endOfWeek)(date);
          }
          return addWeeks(date, diffNum);
        case DateParts.DAY:
          if (isRounded || diff === 0) {
            date = (ordinal === "start" ? startOfDay : endOfDay)(date);
          }
          return addDays(date, diffNum);
        case DateParts.HOUR:
          if (isRounded || diff === 0) {
            date = (ordinal === "start" ? startOfHour : endOfHour)(date);
          }
          return addHours(date, diffNum);
        case DateParts.MINUTE:
          if (isRounded || diff === 0) {
            date = (ordinal === "start" ? startOfMinute : endOfMinute)(date);
          }
          return addMinutes(date, diffNum);
      }
    }
  }
  return undefined;
};

/** @internal */
const parseDateLike = (dt: DateLike): [ParsedDate, ParsedDate] | ParsedDate => {
  if (isNil(dt)) {
    return undefined;
  }
  if (isString(dt) && dt.includes("|")) {
    const [startDate, endDate] = dt.split("|");
    return [
      parseDate(startDate, "start", startDate === endDate),
      parseDate(endDate, "end", startDate === endDate),
    ];
  } else {
    return parseDate(dt);
  }
};

/** @internal */
const parseLabel = (dt: DateLike, locale?: string): string => {
  if (isDate(dt)) {
    return DateUtil.format(new Date(dt), "PP", locale);
  } else if (isDateLike(dt)) {
    const parts = getDateParts(dt);

    if (parts != null) {
      let retVal;
      const { part = "$day", op = "+", diff = 0 } = parts;
      const count = parseInt(`${op}${diff}`, 10);
      const t = (k: string, o?: KeyValue) => i18n.t(`superdate:${k}`, o);
      if (part === DateParts.NOW) {
        retVal = t(`label.${DateParts.NOW}`);
      } else if (count === 0) {
        retVal = t(`now.${part}`);
      } else {
        retVal = t(`${count < 0 ? "prev" : "next"}.${part}`, {
          count: Math.abs(count),
        });
      }
      return retVal;
    }
  }
  return "";
};

/** @internal */
export const parseDateLabel = (dt: DateLike, locale?: string): string => {
  if (isNil(dt)) {
    return "";
  }
  if (isString(dt) && dt.includes("|")) {
    const [startDate, endDate] = dt.split("|");
    return startDate === endDate
      ? parseLabel(startDate, locale)
      : [parseLabel(startDate, locale), parseLabel(endDate, locale)].join(
          ` ${i18n.t(`superdate:separator`, "→")} `
        );
  } else {
    return parseLabel(dt, locale);
  }
};

/** @internal */
export const makeSuperDate = (start?: DateLike, end?: DateLike) => {
  const startParsed = parseDate(start);
  const endParsed = parseDate(end);
  if (
    start &&
    end &&
    start &&
    end &&
    startParsed != null &&
    endParsed != null
  ) {
    const st = isDateLike(start) ? start : startParsed.toISOString();
    const en = isDateLike(end) ? end : endParsed.toISOString();
    return isBefore(startParsed, endParsed) ? `${st}|${en}` : `${en}|${st}`;
  } else if (start && !end && isDateLike(start)) {
    return start.includes("-")
      ? `${start}|${DateParts.NOW}`
      : `${DateParts.NOW}|${start}`;
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

export const DateMath = {
  isValid(dt: DateLike, ignoreNumber = false): boolean {
    if (isString(dt) && dt.includes("|")) {
      const [start, end] = dt.split("|");
      return (
        ((isDate(start, ignoreNumber) || isDateLike(start)) &&
          isDate(end, ignoreNumber)) ||
        isDateLike(end)
      );
    }
    return isDate(dt, ignoreNumber) || isDateLike(dt);
  },
  parse(dt: DateLike): ParsedDate {
    return parseDateLike(dt) as ParsedDate;
  },
  parseRange(dt: DateLike): [ParsedDate, ParsedDate] {
    return parseDateLike(dt) as [ParsedDate, ParsedDate];
  },
  label(dt: DateLike, locale?: string): string {
    return parseDateLabel(dt, locale);
  },
  convert(dates: [ParsedDate, ParsedDate] | undefined): string {
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      if (start != null && end != null)
        return `${start.toISOString()}|${end.toISOString()}`;
    }
    return "";
  },
  age(dt: DateLike) {
    const dates = parseDate(dt as AnyObject);
    if (dates != null && isDate(dates)) {
      return formatDistanceToNowStrict(dates);
    }
  },
  toISOString(dt: DateLike): [DateLike, DateLike] | DateLike {
    const dates = parseDateLike(dt);
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      return [start?.toISOString(), end?.toISOString()];
    } else if (dates != null) {
      return dates.toISOString();
    }
    return undefined;
  },
  toString(dt: DateLike, format = "PPpp", locale?: string) {
    const dates = parseDateLike(dt);
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      return [
        start != null && DateUtil.format(start, format, locale),
        end != null && DateUtil.format(end, format, locale),
      ].join(` ${i18n.t(`superdate:separator`, "→")} `);
    } else if (dates != null) {
      return DateUtil.format(dates, format, locale);
    }
    return undefined;
  },
  toHijri(dt: DateLike, format = "MMM dd yyyy, HH:mm:ss aaa", locale?: string) {
    const dates = parseDateLike(dt);
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      return [
        start != null && DateUtil.format(start, format, locale, true),
        end != null && DateUtil.format(end, format, locale, true),
      ].join(` ${i18n.t(`superdate:separator`, "→")} `);
    } else if (dates != null) {
      return DateUtil.format(dates, format, locale, true);
    }
    return undefined;
  },
};
