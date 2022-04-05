// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { cloneElement, ReactElement, ReactNode } from "react";
import { AxToolbar } from "../appbars/Toolbar";
import { useIcon } from "../hooks/useIcon";
import { ElementProps, IconProps, VFC } from "../types";

/** @internal */
export interface EmptyContentProps extends IconProps<JSX.Element>, ElementProps {
  /**
   * Title text
   */
  title?: string | JSX.Element;
  /**
   * Empty reason or message
   */
  message: string | JSX.Element;
  /**
   * Actions
   */
  actions?: JSX.Element[];
  /**
   * Image
   */
  image?: ReactNode;
}

export const EmptyContent: VFC<EmptyContentProps> = ({
  icon,
  title,
  message,
  actions = [],
  image,
  className
}) => {
  const iconEl = useIcon(icon);
  return (
    <div className={`ax-content__empty ${className ?? ""}`}>
      {image && <div>{image}</div>}
      {!image && iconEl}
      {title && <h3>{title}</h3>}
      {message && <p>{message}</p>}
      <AxToolbar align="center">
        {actions.map((action) => cloneElement(action as ReactElement, { type: "link" }))}
      </AxToolbar>
    </div>
  );
};
