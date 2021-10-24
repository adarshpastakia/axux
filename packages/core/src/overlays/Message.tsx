// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useMemo } from "react";
import { AxButton } from "../buttons/Button";
import { AxIcon } from "../icons/Icon";
import { AllColors, IconProps, VFC } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface MessageProps extends IconProps {
  /**
   * Message title
   */
  title?: string;
  /**
   * Message text
   */
  text?: string | JSX.Element;
  /**
   * Theme color
   */
  color?: AllColors;
  /**
   * Dismiss message label
   */
  dismissLabel?: string;
  /**
   * Full width message
   */
  block?: boolean;
}

/**
 * Notification message
 * @param title
 * @param text
 * @param dismissLabel
 * @param icon
 * @param color
 * @param block
 * @param onClose
 * @constructor
 */
export const AxMessage: VFC<MessageProps & { [key: string]: AnyObject }> = ({
  title,
  text,
  dismissLabel,
  icon,
  color = "invert",
  block,
  onClose
}) => {
  const classes = useMemo(() => {
    const cls = ["ax-message"];
    if (color) {
      cls.push(`ax-bg--${color} ax-color--contrast`);
    }
    if (block) {
      cls.push("ax-block");
    }
    return cls.join(" ");
  }, [block, color]);
  return (
    <div className={classes} data-color={color}>
      {icon && <AxIcon icon={icon} size="sm" />}
      {title && <b>{title}</b>}
      <span>{text}</span>
      <AxButton
        icon={!dismissLabel ? AppIcons.iconClose : undefined}
        size="sm"
        type="link"
        label={dismissLabel}
        onClick={onClose}
      />
    </div>
  );
};
AxMessage.displayName = "AxMessage";
