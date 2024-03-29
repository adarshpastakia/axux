/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type FC, type Ref } from "react";
import { AxIcon } from "../icons/Icon";
import { CloseX, type Color, type IconProp } from "../types";

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
  actions?: false | JSX.Element[];

  onClose: (b?: boolean) => void;
  rootRef?: Ref<HTMLDivElement>;
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
  onClose,
  rootRef,
}) => {
  return (
    <div className="ax-message" data-color={color} ref={rootRef}>
      {icon && <AxIcon icon={icon} size="md" rtlFlip={rtlFlip} />}
      {title && <b>{title}</b>}
      <p>{message}</p>
      <div onClickCapture={() => onClose?.(false)}>{actions}</div>
      {CloseX(onClose)}
    </div>
  );
};
