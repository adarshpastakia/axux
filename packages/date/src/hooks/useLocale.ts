// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useAxGlobals } from "@axux/core";
import { useEffect, useState } from "react";

export const useLocale = (isHijriDefault = false) => {
  const { dateLocale } = useAxGlobals();
  const [isHijri, setHijri] = useState(isHijriDefault ?? false);

  useEffect(() => {
    setHijri(isHijriDefault);
  }, [isHijriDefault]);
  useEffect(() => {
    setHijri(dateLocale ? dateLocale.code.startsWith("ar") : false);
  }, [dateLocale]);

  return { dateLocale, isHijri, setHijri };
};
