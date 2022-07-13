/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import i18n from "i18next";
import ar from "./ar.json";
import en from "./en.json";

/**
 * add language bundles using bundle keys as namespaces
 * @param key
 * @param languageBundles: {en: {}, ar: {}}
 */
export const addTranslationBundle = (
  key: string,
  languageBundles: KeyValue
) => {
  const callback = () => {
    Object.keys(languageBundles).forEach((lang) => {
      const bundle = languageBundles[lang];
      i18n.addResourceBundle(lang, key, bundle, true, false);
    });
  };
  if (i18n.isInitialized) {
    callback();
  } else {
    i18n.on("initialized", callback);
  }
};
addTranslationBundle("core", { en, ar });
