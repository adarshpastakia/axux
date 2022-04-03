// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AxButton } from "../buttons/Button";
import { Globals } from "../context/Globals";
import { AxMenuItem } from "../menu/MenuItem";
import { ElementProps, VFC } from "../types";
import { AppIcons } from "../types/appIcons";

/**
 * Toggle between light and dark themes
 * @internal
 */
export const AxThemeToggle: VFC<ElementProps & { isMenu?: boolean }> = ({ className, isMenu }) => {
  const { toggleTheme } = useContext(Globals);
  const { t } = useTranslation("core");
  return isMenu ? (
    <AxMenuItem
      label={t("options.theme")}
      onClick={toggleTheme}
      icon={AppIcons.iconTheme}
      className={className}
    />
  ) : (
    <AxButton
      type="link"
      color="primary"
      onClick={toggleTheme}
      icon={AppIcons.iconTheme}
      className={className}
    />
  );
};
