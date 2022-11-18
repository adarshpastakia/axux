/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useGlobals } from "@axux/core/dist/context/Global";
import { ElementProps } from "@axux/core/dist/types";
import { RefProp } from "@axux/core/src/types";
import { FC, forwardRef, useMemo } from "react";
import { DateLike } from "../types";
import { DateMath } from "../utils";

export interface DateDisplayProps extends ElementProps, RefProp {
  /**
   * date value
   */
  date: DateLike;
  /**
   * date format string
   */
  format?: string;
}

export const AxDateDisplay: FC<DateDisplayProps> = forwardRef(
  (
    {
      date,
      format = "eee, MMM dd yyyy, HH:mm:ss aaa",
      className,
      // @ts-ignore
      "data-popover-open": openPopover,
      ...rest
    },
    ref
  ) => {
    const { currentCalendar, currentLocale } = useGlobals();

    const isHijri = useMemo(
      () => currentCalendar === "hijri",
      [currentCalendar]
    );

    const dateLabel = useMemo(() => {
      return DateMath.toString(date, format, currentLocale) ?? "";
    }, [date, currentLocale, format]);
    const hijriLabel = useMemo(() => {
      return DateMath.toHijri(date, format, currentLocale) ?? "";
    }, [date, currentLocale, format]);

    return (
      <span
        {...rest}
        ref={ref}
        className={`inline-block ${className ?? ""}`}
        data-tooltip={isHijri ? dateLabel : hijriLabel}
        data-popover-open={openPopover}
      >
        {isHijri ? hijriLabel : dateLabel}
      </span>
    );
  }
);
