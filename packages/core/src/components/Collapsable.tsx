/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Children, FC, useMemo } from "react";
import { usePropToggle } from "../hooks/usePropToggle";
import { AxIcon } from "../icons/Icon";
import { ChildrenProp, CollapseProps, ElementProps } from "../types";
import { AppIcons } from "../types/appIcons";

export interface CollapsableProps
  extends Omit<CollapseProps, "isCollapsable">,
    ElementProps,
    ChildrenProp {}

export const AxCollapsable: FC<CollapsableProps> = ({
  children,
  className = "",
  isCollapsed = true,
  onCollapse,
  ...rest
}) => {
  const [collapsed, toggleCollapse] = usePropToggle(isCollapsed, onCollapse);

  /******************* check for children count *******************/
  if (Children.toArray(children).length !== 2) {
    throw new Error("Two child elements required");
  }

  const [head, body] = useMemo(() => {
    const childs = Children.toArray(children);
    return childs.length === 1 ? [null, childs[0]] : childs;
  }, [children]);

  /******************* component *******************/
  return (
    <div {...rest} className={`ax-collapsable ${className ?? ""}`}>
      <div
        role="button"
        onClick={toggleCollapse}
        aria-label="Toggle collapse"
        className="ax-collapsable__head"
      >
        <AxIcon
          icon={collapsed ? AppIcons.iconCaretUp : AppIcons.iconCaretDown}
        />
        {head}
      </div>
      {!collapsed && <div className="ax-collapsable__body">{body}</div>}
    </div>
  );
};
