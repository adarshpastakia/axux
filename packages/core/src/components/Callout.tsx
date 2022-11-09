import { FC } from "react";
import { AxIcon } from "../icons/Icon";
import {
  ChildrenProp,
  CloseX,
  Color,
  ElementProps,
  EmptyCallback,
  IconProp,
} from "../types";

export interface CalloutProps extends ElementProps, IconProp, ChildrenProp {
  /**
   * callout color
   */
  color?: Color | "info";
  /**
   * callout title
   */
  title?: string;
  /**
   * single line layout
   */
  inline?: boolean;
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
      className={`callout ${className ?? ""}`}
      data-color={color}
      data-inline={inline}
      {...rest}
    >
      {onClose && <div className="callout__close">{CloseX(onClose)}</div>}
      {(title || icon) && (
        <div className="callout__title">
          {icon && <AxIcon icon={icon} />}
          <span>{title}</span>
        </div>
      )}
      <p>{children}</p>
    </div>
  );
};
