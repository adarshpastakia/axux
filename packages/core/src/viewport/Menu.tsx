// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { getChildProps } from "@axux/utilities/dist/react";
import { Children, cloneElement, FC, useCallback, useEffect, useState } from "react";
import { AxButton } from "../buttons/Button";
import { usePropToggle } from "../internals/usePropToggle";
import { AxMenu } from "../menu/Menu";
import { CollapseProps } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface ViewportMenuProps extends Omit<CollapseProps, "isCollapsable"> {
  /**
   * Fixed options
   */
  options?: JSX.Element[];
}

/**
 * Application viewport menu
 * @param children
 * @param options
 * @param isCollapsed
 * @param onCollapse
 * @constructor
 * @internal
 */
export const AxViewportMenu: FC<ViewportMenuProps> = ({
  children,
  options,
  isCollapsed = false,
  onCollapse
}) => {
  const [collapsed, toggleCollapse] = usePropToggle(isCollapsed, onCollapse);
  const [canCollapse, setCanCollapse] = useState(true);

  useEffect(() => {
    const ob = new ResizeObserver(() => {
      setCanCollapse(document.body.clientWidth >= 1100);
    });
    ob.observe(document.body);
    return () => {
      ob.disconnect();
    };
  }, []);

  const getItemIcon = useCallback((item: KeyValue) => {
    return item.icon ?? (item.label ?? "-").substr(0, 1);
  }, []);

  return (
    <div className="ax-viewport__menu" data-collapsed={!canCollapse || collapsed}>
      <AxMenu>
        {Children.toArray(children).map((child: AnyObject) =>
          cloneElement(child, {
            "data-collapsed": collapsed,
            icon: getItemIcon(getChildProps(child))
          })
        )}
      </AxMenu>
      {options && (
        <AxMenu>
          {options.map((child: AnyObject) =>
            cloneElement(child, {
              isFloating: true,
              "data-collapsed": collapsed,
              icon: getItemIcon(child.props)
            })
          )}
        </AxMenu>
      )}
      {canCollapse && (
        <div className="ax-border--t">
          <AxButton
            block
            type="link"
            onClick={toggleCollapse}
            className="ax-margin--none flippable"
            icon={collapsed ? AppIcons.iconMenuExpand : AppIcons.iconMenuCollapse}
          />
        </div>
      )}
    </div>
  );
};
