/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";
import { useIsDark } from "../hooks/useIsDark";
import { AxIcon } from "../icons/Icon";
import { CloseX, Color, IconProp } from "../types";

export interface MessageProps extends IconProp {
  /**
   * message title
   */
  title?: string;
  /**
   * message text
   */
  message: string | JSX.Element;
  /**
   * theme color
   */
  color?: Color;
  /**
   * extra action button
   */
  actions?: JSX.Element[];
}

/**
 * Notification message
 * @param title
 * @param text
 * @param dismissLabel
 * @param icon
 * @param color
 * @param block
 * @param extraActions
 * @param onClose
 * @constructor
 */
export const AxMessage: FC<MessageProps> = ({
  title,
  message,
  icon,
  rtlFlip,
  color,
  actions,
  // @ts-ignore
  onClose,
}) => {
  const isDark = useIsDark();
  return (
    <div className="ax-message" data-color={color}>
      {icon && <AxIcon icon={icon} size="md" rtlFlip={rtlFlip} />}
      {title && <b>{title}</b>}
      <p>{message}</p>
      <div onClickCapture={() => onClose?.(false)}>{actions}</div>
      {CloseX(onClose)}
    </div>
  );
};
