/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxTooltip } from "@axux/core";
import { useGlobals } from "@axux/core/dist/context/Global";
import { ElementProps } from "@axux/core/dist/types";
import { FC, useMemo } from "react";
import { DateLike } from "../types";
import { DateMath } from "../utils";

export interface DateDisplayProps extends ElementProps {
  /**
   * date value
   */
  date: DateLike;
  /**
   * date format string
   */
  format?: string;
}

export const AxDateDisplay: FC<DateDisplayProps> = ({
  date,
  format = "eee, MMM dd yyyy, HH:mm:ss aaa",
  className,
  ...rest
}) => {
  const { currentCalendar, currentLocale } = useGlobals();

  const isHijri = useMemo(() => currentCalendar === "hijri", [currentCalendar]);

  const dateLabel = useMemo(() => {
    return DateMath.toString(date, format, currentLocale) ?? "";
  }, [date, currentLocale, format]);
  const hijriLabel = useMemo(() => {
    return DateMath.toHijri(date, format, currentLocale) ?? "";
  }, [date, currentLocale, format]);

  return (
    <AxTooltip content={isHijri ? dateLabel : hijriLabel}>
      <span {...rest} className={`inline-block ${className ?? ""}`}>
        {isHijri ? hijriLabel : dateLabel}
      </span>
    </AxTooltip>
  );
};
