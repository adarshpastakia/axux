/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isAfter, isBefore, isSameDay } from "date-fns";
import i18next from "i18next";
import { useMemo } from "react";
import { PageType } from "../types";
import { DateUtil } from "../utils";

export const DateCell = ({
  date = new Date(),
  isMuted = false,
  ...props
}: KeyValue) => {
  const {
    page,
    selected,
    selectDate,
    selectPage,
    mouseOver,
    hilight,
    dateDisabled,
    isHijri,
  } = props;

  const isToday = useMemo(() => isSameDay(date, new Date()), [date]);
  const isSelected = useMemo(
    () => selected && isSameDay(date, selected),
    [date, selected]
  );
  const isDisabled = useMemo(() => dateDisabled?.(date), [date, dateDisabled]);

  const isHilightEdge = useMemo(() => {
    if (!isMuted) {
      if (hilight) {
        return isSameDay(date, hilight[0]) ? "start" : false;
      } else if (Array.isArray(selected)) {
        const [start, end] = selected;
        return isSameDay(date, start)
          ? "start"
          : isSameDay(date, end)
          ? "end"
          : false;
      }
    }
  }, [date, hilight, selected, isMuted]);

  const isHilight = useMemo(() => {
    if (!isMuted) {
      if (hilight) {
        const [start, end] = hilight;
        if (isBefore(start, end)) {
          return (
            isAfter(date, start) &&
            isBefore(date, DateUtil.addDays(end, 1, isHijri))
          );
        } else {
          return (
            isBefore(date, start) &&
            isAfter(date, DateUtil.addDays(end, -1, isHijri))
          );
        }
      } else if (Array.isArray(selected)) {
        const [start, end] = selected;
        return (
          isAfter(date, DateUtil.startOfDay(start, isHijri)) &&
          isBefore(date, DateUtil.startOfDay(end, isHijri))
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
      onClick={() =>
        page === PageType.DATE ? selectDate(date) : selectPage(date)
      }
    >
      {page === PageType.DATE &&
        DateUtil.format(date, "d", i18next.language, isHijri)}
      {page === PageType.MONTH &&
        DateUtil.format(date, "MMM", i18next.language, isHijri)}
      {page === PageType.YEAR &&
        DateUtil.format(date, "yyyy", i18next.language, isHijri)}
      {page === PageType.DECADE &&
        `${DateUtil.format(
          DateUtil.startOfDecade(date, isHijri),
          "yyyy",
          i18next.language,
          isHijri
        )}-${DateUtil.format(
          DateUtil.endOfDecade(date, isHijri),
          "yy",
          i18next.language,
          isHijri
        )}`}
    </div>
  );
};
