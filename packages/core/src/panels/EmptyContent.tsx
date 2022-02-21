// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { cloneElement, ReactElement, ReactNode, ReactNodeArray } from "react";
import { AxToolbar } from "../appbars/Toolbar";
import { AxIcon } from "../icons/Icon";
import { ElementProps, IconProps, VFC } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface EmptyContentProps extends IconProps, ElementProps {
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
  actions?: ReactNodeArray;
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
  return (
    <div className={`ax-content__empty ${className ?? ""}`}>
      {image && <div>{image}</div>}
      {!image && <AxIcon icon={icon ?? AppIcons.iconNoResult} />}
      {title && <h3>{title}</h3>}
      {message && <p>{message}</p>}
      <AxToolbar align="center">
        {actions.map((action) => cloneElement(action as ReactElement, { type: "link" }))}
      </AxToolbar>
    </div>
  );
};
