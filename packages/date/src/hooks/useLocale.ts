// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useAxGlobals } from "@axux/core";
import { isNil } from "@axux/utilities";
import { arSA as ar } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const useLocale = (isHijriDefault = false) => {
  const { i18n } = useTranslation();
  const { dateLocale } = useAxGlobals();
  const [isHijri, setHijri] = useState(isHijriDefault ?? false);

  const currentLocale = useMemo(() => {
    return isNil(dateLocale) && i18n.language === "ar" ? ar : dateLocale;
  }, [i18n.language, dateLocale]);

  useEffect(() => {
    setHijri(isHijriDefault);
  }, [isHijriDefault]);
  useEffect(() => {
    setHijri(currentLocale ? currentLocale.code.startsWith("ar") : false);
  }, [currentLocale]);

  return { dateLocale: currentLocale, isHijri, setHijri };
};
