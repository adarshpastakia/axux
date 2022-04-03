// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AxButton } from "../buttons/Button";
import { Globals } from "../context/Globals";
import { AxMenuItem } from "../menu/MenuItem";
import { AxPopover } from "../overlays/Popover";
import { ElementProps, VFC } from "../types";
import { AppIcons } from "../types/appIcons";

const LocaleLabels: KeyValue = {
  en: "English",
  ar: "عربى",
  de: "Deutsche",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  jp: "日本語",
  ko: "한국어",
  pt: "Português",
  ru: "Pусский",
  zh: "中国人"
};

/**
 * Switch between available i18n locales
 * @internal
 */
export const AxLocalePicker: VFC<ElementProps & { isMenu?: boolean }> = ({ className, isMenu }) => {
  const { locales, changeLocale } = useContext(Globals);
  const {
    t,
    i18n: { language }
  } = useTranslation("core");
  return (
    <AxPopover usePortal closeOnClick placement={isMenu ? "right-start" : "bottom-start"}>
      {isMenu ? (
        <AxMenuItem
          label={t("options.locale")}
          icon={AppIcons.iconLocale}
          className={`ax-prevent-close ${className ?? ""}`}
        />
      ) : (
        <AxButton
          type="link"
          color="primary"
          icon={AppIcons.iconLocale}
          className={`ax-prevent-close ${className ?? ""}`}
        />
      )}
      <div dir="ltr">
        {locales.map((locale) => (
          <div key={locale} className="ax-row" onClick={() => changeLocale(locale)}>
            <div
              className="ax-col--fill ax-locale--link"
              data-locale={locale}
              data-selected={locale === language}
            >
              <span>{LocaleLabels[locale] ?? locale}</span>
            </div>
          </div>
        ))}
      </div>
    </AxPopover>
  );
};
