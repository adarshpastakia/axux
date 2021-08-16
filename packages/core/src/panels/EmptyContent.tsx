// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { cloneElement, ReactElement, ReactNodeArray, VFC } from "react";
import { AxToolbar } from "../appbars/Toolbar";
import { AxIcon } from "../icons/Icon";
import { IconProps } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface EmptyContentProps extends IconProps {
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
}

export const EmptyContent: VFC<EmptyContentProps> = ({ icon, title, message, actions = [] }) => {
  return (
    <div className="ax-content__empty">
      <AxIcon icon={icon ?? AppIcons.iconNoResult} />
      {title && <h3>{title}</h3>}
      {message && <p>{message}</p>}
      <AxToolbar>
        {actions.map((action) => cloneElement(action as ReactElement, { type: "link" }))}
      </AxToolbar>
    </div>
  );
};
EmptyContent.displayName = "AxContent.Empty";
