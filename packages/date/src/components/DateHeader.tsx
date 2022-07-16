/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import i18next from "i18next";
import { useMemo } from "react";
import { DateContext, PageType } from "../types";
import { DateUtil } from "../utils";

export const DateHeader = (props: Partial<DateContext>) => {
  const {
    page,
    pageDate = new Date(),
    changePage,
    changePageDate,
    headDisabled,
    isHijri = false,
  } = props;

  const headLabel = useMemo(() => {
    switch (page) {
      case PageType.DATE:
        return DateUtil.format(pageDate, "MMM yyyy", i18next.language, isHijri);
      case PageType.MONTH:
        return DateUtil.format(pageDate, "yyyy", i18next.language, isHijri);
      case PageType.YEAR:
        return `${DateUtil.format(
          DateUtil.startOfDecade(pageDate, isHijri),
          "yyyy",
          i18next.language,
          isHijri
        )} - ${DateUtil.format(
          DateUtil.endOfDecade(pageDate, isHijri),
          "yyyy",
          i18next.language,
          isHijri
        )}`;
      case PageType.DECADE:
        return `${DateUtil.format(
          DateUtil.startOfCentury(pageDate, isHijri),
          "yyyy",
          i18next.language,
          isHijri
        )} - ${DateUtil.format(
          DateUtil.endOfCentury(pageDate, isHijri),
          "yyyy",
          i18next.language,
          isHijri
        )}`;
    }
  }, [i18next.language, isHijri, page, pageDate]);

  return (
    <div className="ax-date__header" data-page={page}>
      {page === PageType.DATE && (
        <AxButton
          size="sm"
          data-pos="first"
          style="link"
          color="primary"
          rtlFlip
          isDisabled={headDisabled && headDisabled(-12)}
          onClick={() => changePageDate?.(-12)}
          icon={AppIcons.iconChevronLeft}
        />
      )}
      <AxButton
        size="sm"
        data-pos="prev"
        style="link"
        color="primary"
        rtlFlip
        isDisabled={headDisabled && headDisabled(-1)}
        onClick={() => changePageDate?.(-1)}
        icon={AppIcons.iconCaretLeft}
      />
      <div
        className="ax-date__header--label"
        onClick={changePage}
        data-disabled={!changePage || page === PageType.DECADE}
      >
        {headLabel}
      </div>
      <AxButton
        size="sm"
        data-pos="next"
        style="link"
        color="primary"
        rtlFlip
        isDisabled={headDisabled && headDisabled(1)}
        onClick={() => changePageDate?.(1)}
        icon={AppIcons.iconCaretRight}
      />
      {page === PageType.DATE && (
        <AxButton
          size="sm"
          data-pos="last"
          style="link"
          color="primary"
          rtlFlip
          isDisabled={headDisabled && headDisabled(12)}
          onClick={() => changePageDate?.(12)}
          icon={AppIcons.iconChevronRight}
        />
      )}
    </div>
  );
};
