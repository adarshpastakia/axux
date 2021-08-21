// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { differenceInDays, format, parseISO } from "date-fns";
import numeral from "numeral";
import { isNil } from "./_isType";

export namespace Format {
  const numberFormat = (number?: string | number, format = "0,0[.]00a") => {
    if (isNil(number)) {
      return "";
    }
    return numeral(number).format(format);
  };

  export const number = (number?: string | number, format?: string) => {
    return numberFormat(number, format);
  };
  export const bytes = (number?: string | number) => {
    return numberFormat(number, "0,0[.]00b");
  };
  export const percent = (number?: string | number) => {
    return numberFormat(number, "0,0[.]00%");
  };
  export const duration = (number?: string | number) => {
    const value = parseInt(`${number}`, 10);
    if (!isNaN(value)) {
      const days = differenceInDays(value, 0);
      const prefix = days > 0 ? `${days}d:` : "";
      return `${prefix}${format(
        parseISO(new Date(value).toISOString().replace("Z", "")),
        "HH:mm:ss.SSS"
      )}`;
    }
    return "00:00:00.000";
  };
}
