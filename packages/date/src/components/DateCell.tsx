// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useAxGlobals } from "@axux/core";
import { isAfter, isBefore, isSameDay } from "date-fns";
import { useMemo } from "react";
import { PageType } from "../types";
import { addDays, dateFormat, endOfDecade, startOfDay, startOfDecade } from "../utils";

export const DateCell = ({ date = new Date(), isMuted = false, ...props }) => {
  const { page, selected, selectDate, selectPage, mouseOver, hilight, dateDisabled, isHijri } =
    props;
  const { dateLocale } = useAxGlobals();

  const isToday = useMemo(() => isSameDay(date, new Date()), [date]);
  const isSelected = useMemo(() => selected && isSameDay(date, selected), [date, selected]);
  const isDisabled = useMemo(() => dateDisabled && dateDisabled(date), [date, dateDisabled]);

  const isHilightEdge = useMemo(() => {
    if (!isMuted) {
      if (hilight) {
        return isSameDay(date, hilight[0]);
      } else if (Array.isArray(selected)) {
        const [start, end] = selected;
        return isSameDay(date, start) || isSameDay(date, end);
      }
    }
  }, [date, hilight, selected, isMuted]);

  const isHilight = useMemo(() => {
    if (!isMuted) {
      if (hilight) {
        const [start, end] = hilight;
        if (isBefore(start, end)) {
          return isAfter(date, start) && isBefore(date, addDays(end, 1, isHijri));
        } else {
          return isBefore(date, start) && isAfter(date, addDays(end, -1, isHijri));
        }
      } else if (Array.isArray(selected)) {
        const [start, end] = selected;
        return (
          isAfter(date, startOfDay(start, isHijri)) && isBefore(date, startOfDay(end, isHijri))
        );
      }
    }
  }, [isMuted, hilight, selected, date, isHijri]);

  return (
    <div
      className="ax-date__cell"
      data-muted={isMuted}
      data-today={isToday}
      data-selected={isSelected || isHilightEdge}
      data-hilight={isHilight}
      data-disabled={isDisabled}
      onMouseOver={() => hilight && page === PageType.DATE && mouseOver(date)}
      onClick={() => (page === PageType.DATE ? selectDate(date) : selectPage(date))}
    >
      {page === PageType.DATE && dateFormat(date, "d", dateLocale, isHijri)}
      {page === PageType.MONTH && dateFormat(date, "MMM", dateLocale, isHijri)}
      {page === PageType.YEAR && dateFormat(date, "yyyy", dateLocale, isHijri)}
      {page === PageType.DECADE &&
        `${dateFormat(startOfDecade(date, isHijri), "yyyy", dateLocale, isHijri)}-${dateFormat(
          endOfDecade(date, isHijri),
          "yy",
          dateLocale,
          isHijri
        )}`}
    </div>
  );
};
