/*
 * AX/UX skeleton project
 * @version   : 0.0.1
 * @copyright : 2022
 * @license   : MIT
 */

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";

void i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { project: en },
    },
    defaultNS: "project",
    fallbackLng: ["en"],
    keySeparator: ".",

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })
  .then();

export default i18next;
