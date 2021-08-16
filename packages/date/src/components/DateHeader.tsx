// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, useAxGlobals } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { useMemo } from "react";
import { DateContext, PageType } from "../types";
import { dateFormat, endOfCentury, endOfDecade, startOfCentury, startOfDecade } from "../utils";

export const DateHeader = (props: DateContext) => {
  const { page, pageDate, changePage, changePageDate, headDisabled, isHijri } = props;
  const { dateLocale } = useAxGlobals();

  const headLabel = useMemo(() => {
    switch (page) {
      case PageType.DATE:
        return dateFormat(pageDate, "MMMM yyyy", dateLocale, isHijri);
      case PageType.MONTH:
        return dateFormat(pageDate, "yyyy", dateLocale, isHijri);
      case PageType.YEAR:
        return `${dateFormat(
          startOfDecade(pageDate, isHijri),
          "yyyy",
          dateLocale,
          isHijri
        )} - ${dateFormat(endOfDecade(pageDate, isHijri), "yyyy", dateLocale, isHijri)}`;
      case PageType.DECADE:
        return `${dateFormat(
          startOfCentury(pageDate, isHijri),
          "yyyy",
          dateLocale,
          isHijri
        )} - ${dateFormat(endOfCentury(pageDate, isHijri), "yyyy", dateLocale, isHijri)}`;
    }
  }, [dateLocale, isHijri, page, pageDate]);

  return (
    <div className="ax-date__header" data-page={page}>
      {page === PageType.DATE && (
        <AxButton
          data-pos="first"
          type="link"
          color="primary"
          isDisabled={headDisabled && headDisabled(-12)}
          onClick={() => changePageDate(-12)}
          icon={AppIcons.iconFirst}
        />
      )}
      <AxButton
        data-pos="prev"
        type="link"
        color="primary"
        isDisabled={headDisabled && headDisabled(-1)}
        onClick={() => changePageDate(-1)}
        icon={AppIcons.iconPrev}
      />
      <div
        className="ax-date__header--label"
        onClick={changePage}
        data-disabled={page === PageType.DECADE}
      >
        {headLabel}
      </div>
      <AxButton
        data-pos="next"
        type="link"
        color="primary"
        isDisabled={headDisabled && headDisabled(1)}
        onClick={() => changePageDate(1)}
        icon={AppIcons.iconNext}
      />
      {page === PageType.DATE && (
        <AxButton
          data-pos="last"
          type="link"
          color="primary"
          isDisabled={headDisabled && headDisabled(12)}
          onClick={() => changePageDate(12)}
          icon={AppIcons.iconLast}
        />
      )}
    </div>
  );
};
