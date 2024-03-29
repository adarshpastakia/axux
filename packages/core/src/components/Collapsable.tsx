/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Children, type FC, useMemo } from "react";
import { usePropToggle } from "../hooks/usePropToggle";
import { AxIcon } from "../icons/Icon";
import { type ChildrenProp, type CollapseProps, type ElementProps } from "../types";
import { AppIcons } from "../types/appIcons";

export interface CollapsableProps
  extends Omit<CollapseProps, "isCollapsable">,
    ElementProps,
    ChildrenProp {
  isDisabled?: boolean;
}

export const AxCollapsable: FC<CollapsableProps> = ({
  children,
  className = "",
  isDisabled = false,
  isCollapsed = true,
  onCollapse,
  ...rest
}) => {
  const [collapsed, toggleCollapse] = usePropToggle(isCollapsed, onCollapse);

  /** ***************** check for children count *******************/
  if (Children.toArray(children).length !== 2) {
    throw new Error("Two child elements required");
  }

  const [head, body] = useMemo(() => {
    const childs = Children.toArray(children);
    return childs.length === 1 ? [null, childs[0]] : childs;
  }, [children]);

  /** ***************** component *******************/
  return (
    <div {...rest} className={`ax-collapsable ${className ?? ""}`}>
      <div
        role="button"
        onClick={isDisabled ? undefined : toggleCollapse}
        aria-label="Toggle collapse"
        className="ax-collapsable__head"
        data-disabled={isDisabled}
      >
        <AxIcon
          icon={
            isDisabled
              ? "M20 14H4V10H20"
              : collapsed
              ? AppIcons.iconCaretUp
              : AppIcons.iconCaretDown
          }
        />
        {head}
      </div>
      {!collapsed && <div className="ax-collapsable__body">{body}</div>}
    </div>
  );
};
