// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { differenceInDays, format, parseISO } from "date-fns";
import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";
import numeral from "numeral";
import { isEmpty, isNil } from "./_isType";
import { Countries } from "./index";

export namespace Format {
  const getPhone = (value = "", country = "ae") => {
    const phone = value.match(/^[0+]/) ? value.replace(/^00/, "+") : `+${value}`;
    const number = parsePhoneNumberFromString(phone, country as CountryCode);
    return number
      ? number
      : {
          country: "",
          formatNational: () => value,
          formatInternational: () => value
        };
  };

  const numberFormat = (number?: string | number, format = "0,0[.]00a") => {
    if (isNil(number)) {
      return "";
    }
    const prefix = `${number}`.startsWith("+") ? "+" : "";
    return prefix + numeral(number).format(format);
  };

  export const phone = (value?: string) => {
    if (isEmpty(value) || !/^[\d+\s\-()]+$/.test(value)) return undefined;
    const phone = getPhone(value);
    return `${Countries.emoji(phone.country ?? "")} ${phone.formatInternational()}`;
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
  export const duration = (number?: string | number, isFraction?: boolean) => {
    if (isNil(number)) {
      return "00:00.000";
    }
    const value = parseFloat(`${number}`) * (isFraction ? 1000 : 1);
    if (!isNaN(value)) {
      const days = differenceInDays(value, 0);
      const prefix = days > 0 ? `${days}d:` : "";
      let time = format(parseISO(new Date(value).toISOString().replace("Z", "")), "HH:mm:ss.SSS");
      if (!prefix) time = time.replace(/^00:/, "");
      return `${prefix}${time}`;
    }
    return "00:00.000";
  };
}
