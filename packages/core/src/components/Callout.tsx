/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { AxIcon } from "../icons/Icon";
import { Close } from "../internal/Close";
import {
  type ChildrenProp,
  type Color,
  type ElementProps,
  type EmptyCallback,
  type IconProp,
} from "../types";

export interface CalloutProps extends ElementProps, IconProp, ChildrenProp {
  /**
   * callout color
   */
  color?: Color;
  /**
   * callout title
   */
  title?: string;
  /**
   * single line layout
   */
  inline?: boolean;
  /**
   * close handler
   */
  onClose?: EmptyCallback;
}

export const AxCallout: FC<CalloutProps> = ({
  children,
  color,
  icon,
  title,
  inline,
  className,
  onClose,
  ...rest
}) => {
  return (
    <div
      className={`ax-callout ${className ?? ""}`}
      data-color={color}
      data-inline={inline}
      {...rest}
    >
      {onClose != null && (
        <div className="ax-callout__close">{Close(onClose)}</div>
      )}
      {(!!title || !!icon) && (
        <div className="ax-callout__title">
          {icon && <AxIcon icon={icon} />}
          <span>{title}</span>
        </div>
      )}
      <div className="ax-callout__body">{children}</div>
    </div>
  );
};
