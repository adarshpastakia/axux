// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { Children, FC, useMemo } from "react";
import { AxIcon } from "../icons/Icon";
import { usePropToggle } from "../internals/usePropToggle";
import { AxBox } from "../layout/Box";
import { CollapseProps, ElementProps } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface CollapsableProps extends Omit<CollapseProps, "isCollapsable">, ElementProps {}

export const AxCollapsable: FC<CollapsableProps> = ({
  children,
  className = "",
  isCollapsed = true,
  onCollapse
}) => {
  const [collapsed, toggleCollapse] = usePropToggle(isCollapsed, onCollapse);
  const [head, body] = useMemo(() => {
    const childs = Children.toArray(children);
    return childs.length === 1 ? [null, childs[0]] : childs;
  }, [children]);
  return (
    <AxBox className={`ax-collapsable ${className}`}>
      <div
        aria-label="Toggle collapse"
        className="ax-collapsable__head ax-row ax-row--middle ax-gutter--sm ax-clickable"
        onClick={toggleCollapse}
      >
        <AxIcon
          size="md"
          className="flippable ax-col ax-col--auto"
          icon={collapsed ? AppIcons.iconCaretRight : AppIcons.iconCaretDown}
        />
        <div className="ax-col ax-col--fill">{head}</div>
      </div>
      {!collapsed && body}
    </AxBox>
  );
};
