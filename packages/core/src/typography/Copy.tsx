/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ActionButton, type ActionProps } from "../buttons/Action";
import { AppIcons } from "../types/appIcons";

export interface CopyProps
  extends Omit<ActionProps, "style" | "icon" | "message" | "onClick"> {
  /**
   * text value to copy
   */
  text: string;
}

/**
 * Text copy action
 */
export const Copy: FC<CopyProps> = ({ text, tooltip, className, ...rest }) => {
  const { t } = useTranslation("core");

  /** ***************** handle copy *******************/
  const doCopy = useCallback(() => {
    void navigator.clipboard.writeText(text);
  }, [text]);

  /** ***************** component *******************/
  return text ? (
    <ActionButton
      {...rest}
      variant="link"
      className={`ax-copy ${className ?? ""}`}
      icon={AppIcons.iconCopy}
      tooltip={tooltip ?? t("action.copy")}
      message={t("action.copied")}
      onClick={doCopy}
      stopPropagation
    />
  ) : null;
};
