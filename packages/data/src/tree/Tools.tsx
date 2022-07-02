/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxDivider } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { useTranslation } from "react-i18next";

export const TreeTools = ({
  onExpand,
  onCollapse,
  onCheckAll,
  onUncheckAll,
}: KeyValue) => {
  const { t } = useTranslation("data");
  return (
    <div className="ax-tree__tools">
      <AxButton
        size="sm"
        type="link"
        color="accent"
        onClick={onExpand}
        icon={AppIcons.iconExpandAll}
        tooltip={t("action.expandAll")}
      />
      <AxButton
        size="sm"
        type="link"
        color="accent"
        onClick={onCollapse}
        icon={AppIcons.iconCollapseAll}
        tooltip={t("action.collapseAll")}
      />
      <AxDivider vertical size="xs" />
      <AxButton
        size="sm"
        type="link"
        color="accent"
        onClick={onUncheckAll}
        icon={AppIcons.iconCheckboxOff}
        tooltip={t("action.uncheckAll")}
      />
      <AxButton
        size="sm"
        type="link"
        color="accent"
        onClick={onCheckAll}
        icon={AppIcons.iconCheckAll}
        tooltip={t("action.checkAll")}
      />
    </div>
  );
};
