/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxDivider, AxMenu } from "@axux/core";
import { useTranslation } from "react-i18next";
import { useSearchContext } from "../context";
import { Icons } from "../types/icons";

export const GlobalMenu = () => {
  const { t } = useTranslation("searchbar");
  const { toggleDisable, toggleExclude, removeAll, filters } =
    useSearchContext();

  return (
    <AxButton.Dropdown
      style="link"
      isDisabled={filters.length === 0}
      dropdownClassName="ax-filter__menu"
      className="flush"
      size="sm"
      icon={Icons.iconCog}
      showCaret={false}
    >
      <AxMenu.Item
        icon={Icons.iconEnable}
        label={t("label.enableAll")}
        onClick={() => toggleDisable(false)}
      />
      <AxMenu.Item
        icon={Icons.iconDisable}
        label={t("label.disableAll")}
        onClick={() => toggleDisable(true)}
      />
      <AxMenu.Item
        icon={Icons.iconInvert}
        label={t("label.invert")}
        onClick={toggleExclude}
      />
      <AxDivider size="xs" />
      <AxMenu.Item
        onClick={removeAll}
        icon={Icons.iconDelete}
        label={t("label.removeAll")}
        className="ax-filter__deleteButton"
      />
    </AxButton.Dropdown>
  );
};
