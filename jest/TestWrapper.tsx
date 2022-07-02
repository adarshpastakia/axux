/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import i18next from "i18next";
import { FC, PropsWithChildren } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";

i18next
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      en: {},
    },
    defaultNS: "core",
    fallbackLng: ["en"],
    keySeparator: ".",

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })
  .then();
i18next.languages = ["en", "ar"];

export const TestWrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};
