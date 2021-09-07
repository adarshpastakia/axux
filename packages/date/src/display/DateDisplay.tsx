// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxText, AxTooltip } from "@axux/core";
import { TextProps } from "@axux/core/dist/typography/Text";
import { useMemo, VFC } from "react";
import { useLocale } from "../hooks/useLocale";
import { DateLike } from "../types";
import { dateFormat } from "../utils";

export interface DateDisplayProps
  extends Omit<TextProps, "mark" | "abbr" | "block" | "clip" | "transform"> {
  date: DateLike | [DateLike, DateLike];
  format?: string;
}

export const AxDateDisplay: VFC<DateDisplayProps> = ({
  date,
  format = "dd MMM yyyy",
  ...props
}) => {
  const { isHijri, dateLocale } = useLocale();

  const display = useMemo(() => {
    if (Array.isArray(date)) {
      return `${dateFormat(date[0], format, dateLocale, isHijri)} - ${dateFormat(
        date[1],
        format,
        dateLocale,
        isHijri
      )}`;
    } else {
      return dateFormat(date, format, dateLocale, isHijri);
    }
  }, [date, dateLocale, format, isHijri]);
  const tooltip = useMemo(() => {
    if (Array.isArray(date)) {
      return `${dateFormat(date[0], format, dateLocale, !isHijri)} - ${dateFormat(
        date[1],
        format,
        dateLocale,
        !isHijri
      )}`;
    } else {
      return dateFormat(date, format, dateLocale, !isHijri);
    }
  }, [date, dateLocale, format, isHijri]);

  return (
    <AxTooltip content={tooltip} usePortal>
      <AxText {...props}>
        <span className="ax-inline-block">{display}</span>
      </AxText>
    </AxTooltip>
  );
};
