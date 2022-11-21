/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useIsRtl = () => {
  const { i18n } = useTranslation("core");
  const [isRtl, setIsRtl] = useState(false);

  /** ***************** update RTL flag on i18n locale change *******************/
  useLayoutEffect(() => {
    setIsRtl(i18n.dir() === "rtl");
  }, [i18n.language]);

  return isRtl;
};
