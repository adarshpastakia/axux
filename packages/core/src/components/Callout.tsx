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
      className={`ax-callout ${className ?? ""}`}
      data-color={color}
      data-inline={inline}
      {...rest}
    >
      {onClose && <div className="ax-callout__close">{CloseX(onClose)}</div>}
      {(title || icon) && (
        <div className="ax-callout__title">
          {icon && <AxIcon icon={icon} />}
          <span>{title}</span>
        </div>
      )}
      <div className="ax-callout__body">{children}</div>
    </div>
  );
};
