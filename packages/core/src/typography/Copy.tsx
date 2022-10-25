/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ActionButton, ActionProps } from "../buttons/Action";
import { AppIcons } from "../types/appIcons";

export interface CopyProps
  extends Omit<ActionProps, "style" | "icon" | "message" | "onClick"> {
  /**
   * text value to copy
   */
  text: string;
}

export const Copy: FC<CopyProps> = ({ text, tooltip, className, ...rest }) => {
  const { t } = useTranslation("core");

  /******************* handle copy *******************/
  const doCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  /******************* component *******************/
  return !!text ? (
    <ActionButton
      {...rest}
      style="link"
      className={`ax-copy ${className ?? ""}`}
      icon={AppIcons.iconCopy}
      tooltip={tooltip ?? t("action.copy")}
      message={t("action.copied")}
      onClick={doCopy}
      stopPropagation
    />
  ) : null;
};
