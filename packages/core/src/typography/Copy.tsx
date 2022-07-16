/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ActionButton } from "../buttons/Action";
import { TooltipType } from "../types";
import { AppIcons } from "../types/appIcons";

export interface CopyProps {
  /**
   * text value to copy
   */
  text: string;
  /**
   * tooltip
   */
  tooltip?: TooltipType;
}

export const Copy: FC<CopyProps> = ({ text, tooltip }) => {
  const { t } = useTranslation("core");

  /******************* handle copy *******************/
  const doCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  /******************* component *******************/
  return (
    <ActionButton
      style="link"
      className="ax-copy"
      icon={AppIcons.iconCopy}
      tooltip={tooltip ?? t("action.copy")}
      message={t("action.copied")}
      onClick={doCopy}
      stopPropagation
    />
  );
};
