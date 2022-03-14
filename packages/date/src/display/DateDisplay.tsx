// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxText, AxTooltip } from "@axux/core";
import { VFC } from "@axux/core/dist/types";
import { TextProps } from "@axux/core/dist/typography/Text";
import { useMemo } from "react";
import { useLocale } from "../hooks/useLocale";
import { DateLike } from "../types";
import { dateFormat } from "../utils";
import { DateUtils } from "../utils/dateMath";

export interface DateDisplayProps
  extends Omit<TextProps, "mark" | "abbr" | "block" | "clip" | "transform"> {
  date: DateLike | [DateLike, DateLike];
  withTime?: boolean;
  showAge?: boolean;
  format?: string;
}

export const AxDateDisplay: VFC<DateDisplayProps> = ({
  date,
  withTime,
  showAge,
  format,
  ...props
}) => {
  const { isHijri, dateLocale } = useLocale();

  const fmt = useMemo(
    () => format ?? `dd MMM yyyy${withTime ? " HH:mm:ss" : ""}`,
    [format, withTime]
  );

  const display = useMemo(() => {
    if (Array.isArray(date)) {
      return `${dateFormat(date[0], fmt, dateLocale, isHijri)} - ${dateFormat(
        date[1],
        fmt,
        dateLocale,
        isHijri
      )}`;
    } else {
      return dateFormat(date, fmt, dateLocale, isHijri);
    }
  }, [date, dateLocale, fmt, isHijri]);
  const tooltip = useMemo(() => {
    if (Array.isArray(date)) {
      return `${dateFormat(date[0], fmt, dateLocale, !isHijri)} - ${dateFormat(
        date[1],
        fmt,
        dateLocale,
        !isHijri
      )}`;
    } else {
      return dateFormat(date, fmt, dateLocale, !isHijri);
    }
  }, [date, dateLocale, fmt, isHijri]);

  const age = useMemo(() => !Array.isArray(date) && DateUtils.age(date), [date]);

  return (
    <AxTooltip content={tooltip}>
      <AxText {...props}>
        <span className="ax-inline-block">{display}</span>
        {showAge && !!age && <span className="ax-inline-block">&nbsp;({age})</span>}
      </AxText>
    </AxTooltip>
  );
};
