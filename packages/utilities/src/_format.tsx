/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { differenceInDays, format, parseISO } from "date-fns";
import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";
import numeral from "numeral";
import { isEmpty, isNil } from "./_isType";

export namespace Format {
  /******************* get phone number object using `libphonenumber-js` *******************/
  const getPhone = (value = "", country = "ae") => {
    const phone = value.match(/^[0+]/)
      ? value.replace(/^00/, "+")
      : `+${value}`;
    const number = parsePhoneNumberFromString(phone, country as CountryCode);
    return number
      ? number
      : {
          country: "",
          formatNational: () => value,
          formatInternational: () => value,
        };
  };

  /******************* common number format method using `numeral` *******************/
  const numberFormat = (number?: string | number, format = "0,0[.]00a") => {
    if (isNil(number)) {
      return "";
    }
    const prefix = `${number}`.startsWith("+") ? "+" : "";
    return prefix + numeral(number).format(format);
  };

  const makeDuration = (value: number, fmt = "HH:mm:ss.SSS") => {
    if (!isNaN(value)) {
      const days = differenceInDays(value, 0);
      const prefix = days > 0 ? `${days}d:` : "";
      let time = format(
        parseISO(new Date(value).toISOString().replace("Z", "")),
        fmt
      );
      if (!prefix) time = time.replace(/^00:/, "");
      return `${prefix}${time}`;
    }
  };

  /******************* format phone number using `libphonenumber-js` *******************/
  export const phone = (value?: string) => {
    if (isEmpty(value) || !/^[\d+\s\-()]+$/.test(value)) return undefined;
    const phone = getPhone(value);
    return (
      <>
        <span className={` flag ${phone.country ?? ""}`} />
        &nbsp;<span>{phone.formatInternational()}</span>
      </>
    );
  };
  /******************* format whole number using `numeral` *******************/
  export const number = (number?: string | number, format?: string) => {
    return numberFormat(number, format);
  };
  /******************* format bytes using `numeral` *******************/
  export const bytes = (number?: string | number) => {
    return numberFormat(number, "0,0[.]00b");
  };
  /******************* format percentage using `numeral` *******************/
  export const percent = (number?: string | number) => {
    return numberFormat(number, "0,0[.]00%");
  };
  /******************* format date using `date-fns` *******************/
  export const date = (date?: Date | string | number, fmt = "d-M-y") => {
    return date ? format(new Date(date), fmt) : "";
  };
  /******************* format time duration from total seconds/milliseconds *******************/
  export const duration = (number?: string | number, isFraction?: boolean) => {
    if (isNil(number)) {
      return "00:00.000";
    }
    const value = parseFloat(`${number}`) * (isFraction ? 1000 : 1);
    if (!isNaN(value)) {
      return makeDuration(value, "HH:mm:ss.SSS");
    }
    return "00:00.000";
  };
  export const durationSeconds = (
    number?: string | number,
    isFraction?: boolean
  ) => {
    if (isNil(number)) {
      return "00:00";
    }
    const value = parseFloat(`${number}`) * (isFraction ? 1000 : 1);
    if (!isNaN(value)) {
      return makeDuration(value, "HH:mm:ss");
    }
    return "00:00";
  };
}
