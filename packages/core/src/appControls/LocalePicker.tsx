// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useTranslation } from "react-i18next";
import { AxButton } from "../buttons/Button";
import { AxMenuItem } from "../menu/MenuItem";
import { AxPopover } from "../overlays/Popover";
import { ElementProps, VFC } from "../types";
import { AppIcons } from "../types/appIcons";
import { useAxGlobals } from "../../dist";

/**
 * Switch between available i18n locales
 * @internal
 */
export const AxLocalePicker: VFC<ElementProps & { isMenu?: boolean }> = ({ className, isMenu }) => {
  const { locales = [], changeLocale } = useAxGlobals();
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
          hideCaret
          type="link"
          color="primary"
          icon={AppIcons.iconLocale}
          className={`ax-prevent-close ${className ?? ""}`}
        />
      )}
      <div dir="ltr">
        {locales.map((locale: string) => (
          <div key={locale} className="ax-row" onClick={() => changeLocale(locale)}>
            <div
              className="ax-col--fill ax-locale--link"
              data-locale={locale}
              data-selected={locale === language}
            >
              <span>{t(`locale.${locale}`, locale)}</span>
            </div>
          </div>
        ))}
      </div>
    </AxPopover>
  );
};
