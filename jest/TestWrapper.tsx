/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import i18next from "i18next";
import { FC, PropsWithChildren } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { AxApplicationProvider } from "@axux/core/src";

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

export default {
  parameters: {},
  decorators: [
    (Story: any) => {
      return (
        <I18nextProvider i18n={i18next}>
          <AxApplicationProvider>
            {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
            <Story />
          </AxApplicationProvider>
        </I18nextProvider>
      );
    },
  ],
};
