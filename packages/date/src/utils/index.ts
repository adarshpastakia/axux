// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import {
  endOfDay,
  endOfDecade,
  endOfMonth,
  endOfYear,
  format,
  isAfter,
  isBefore,
  isValid,
  startOfDay,
  startOfDecade,
  startOfMonth,
  startOfYear
} from "date-fns";
import { PageType } from "../types";

export * from "./dateUtils";
export const isDateDisabled = (date: Date, page: PageType, min?: Date, max?: Date) => {
  if (page === PageType.DATE) {
    return (
      (!!min && isBefore(startOfDay(date), startOfDay(min))) ||
      (!!max && isAfter(endOfDay(date), endOfDay(max)))
    );
  }
  if (page === PageType.MONTH) {
    return (
      (!!min && isBefore(startOfMonth(date), startOfMonth(min))) ||
      (!!max && isAfter(endOfMonth(date), endOfMonth(max)))
    );
  }
  if (page === PageType.YEAR) {
    return (
      (!!min && isBefore(startOfYear(date), startOfYear(min))) ||
      (!!max && isAfter(endOfYear(date), endOfYear(max)))
    );
  }
  if (page === PageType.DECADE) {
    return (
      (!!min && isBefore(startOfDecade(date), startOfDecade(min))) ||
      (!!max && isAfter(endOfDecade(date), endOfDecade(max)))
    );
  }

  return false;
};
