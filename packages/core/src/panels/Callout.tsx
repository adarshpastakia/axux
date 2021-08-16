// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, useCallback, useState } from "react";
import { AxIcon } from "../icons/Icon";
import { AlertClose } from "../internals/AlertClose";
import { Color, ElementProps, EmptyCallback, IconProps } from "../types";

/** @internal */
export interface CalloutProps extends ElementProps, IconProps {
  /**
   * Callout title
   */
  title?: string;
  /**
   * Theme color
   */
  color?: Color;
  /**
   * Closable
   */
  isClosable?: boolean;
  /**
   * Close handler
   */
  onClose?: EmptyCallback;
}

/**
 * Notification toast
 * @param title
 * @param text
 * @param icon
 * @param color
 * @param aria
 * @constructor
 */
export const AxCallout: FC<CalloutProps> = ({
  title,
  icon,
  color = "primary",
  isClosable,
  onClose,
  className,
  children,
  ...aria
}) => {
  const [closed, setClosed] = useState(false);
  const handleClose = useCallback(() => {
    setClosed(true);
    onClose && onClose();
  }, [onClose]);
  return closed ? null : (
    <div className={`ax-callout ${className ?? ""}`} data-color={color} {...aria}>
      {isClosable && <AlertClose onClick={handleClose} />}
      {icon && (
        <div className="ax-callout__icon">
          <AxIcon icon={icon} />
        </div>
      )}
      {title && <div className="ax-callout__title">{title}</div>}
      <span className="ax-callout__body">{children}</span>
    </div>
  );
};
AxCallout.displayName = "AxCallout";
