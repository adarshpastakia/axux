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
  title?: string | JSX.Element;
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
 * @internal
 */
export const AxCallout: FC<CalloutProps> = ({
  title,
  icon,
  rtlFlip,
  color = "primary",
  isClosable,
  onClose,
  className,
  children,
  ...props
}) => {
  const [closed, setClosed] = useState(false);
  const handleClose = useCallback(() => {
    setClosed(true);
    onClose && onClose();
  }, [onClose]);
  return closed ? null : (
    <div className={`ax-callout ${className ?? ""}`} data-color={color} {...props}>
      {isClosable && <AlertClose onClick={handleClose} />}
      {icon && (
        <div className="ax-callout__icon">
          <AxIcon icon={icon} rtlFlip={rtlFlip} />
        </div>
      )}
      {title && <div className="ax-callout__title">{title}</div>}
      <span className="ax-callout__body">{children}</span>
    </div>
  );
};
AxCallout.displayName = "AxCallout";
