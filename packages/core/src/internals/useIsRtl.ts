// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/** @internal */
export const useIsRtl = () => {
  const { i18n } = useTranslation();
  const [isRtl, setIsRtl] = useState(false);
  useLayoutEffect(() => {
    setIsRtl(i18n.dir() === "rtl");
  }, [i18n.language]);

  return { isRtl };
};
