// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isFalse } from "@axux/utilities";
import { getChildProps } from "@axux/utilities/dist/react";
import { Children, cloneElement, FC, useEffect, useMemo, useState } from "react";
import { AxIcon } from "../icons/Icon";
import { BadgeType, useBadge } from "../internals/useBadge";
import { ElementProps, EmptyCallback, IconProps } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface TabProps extends IconProps, ElementProps {
  id: string;
  label?: string;
  badge?: BadgeType;
  isPinned?: boolean;
  isDisabled?: boolean;
  onClose?: EmptyCallback;
}

/**
 * Tab button
 * @internal
 */
export const Tab: FC<TabProps> = ({
  id,
  icon,
  label,
  badge,
  className = "",
  isPinned = false,
  isDisabled = false,
  onClose,
  ...props
}) => {
  const badgeEl = useBadge(badge);

  return (
    <a
      className={`ax-tab__button ${className}`}
      {...props}
      key={id}
      data-id={id}
      data-pinned={isPinned}
      data-disabled={isDisabled}
    >
      <div className="ax-tab__button--label">
        {icon && <AxIcon icon={icon} />}
        {label && <span>{label}</span>}
      </div>
      {badgeEl}
      {!!onClose && (
        <AxIcon
          className="ax-tab__button--close"
          icon={AppIcons.iconClose}
          onClick={(e) => {
            onClose();
            e.stopPropagation();
          }}
        />
      )}
    </a>
  );
};
Tab.displayName = "AxTabPanel.Tab";

/** @internal */
export interface TabPanelProps extends Pick<ElementProps, "className"> {
  /**
   * @default "top"
   */
  align?: "top" | "bottom" | "start" | "end";

  activeTab?: string;
  onBeforeChange?: (oldKey?: string, newKey?: string) => boolean | Promise<boolean> | void;
  onActiveChange?: (key: string) => void;

  prepend?: JSX.Element;
  append?: JSX.Element;
}

interface ExtendedFC extends FC<TabPanelProps> {
  Tab: typeof Tab;
}

/**
 * Tab panel
 * @param children
 * @param className
 * @param align
 * @param activeTab
 * @param onBeforeChange
 * @param onActiveChange
 * @param prepend
 * @param append
 * @constructor
 * @internal
 */
export const AxTabPanel: ExtendedFC = ({
  children,
  className = "",
  align = "top",
  activeTab,
  onBeforeChange,
  onActiveChange,
  prepend,
  append
}) => {
  const [active, setActive] = useState(activeTab);

  const pinned = useMemo(() => {
    return Children.toArray(children).filter((child) => getChildProps(child).pinned);
  }, [children]);
  const tabs = useMemo(() => {
    return Children.toArray(children).filter((child) => !getChildProps(child).pinned);
  }, [children]);

  const tabMap = useMemo(() => {
    return Children.toArray(children)
      .map(getChildProps)
      .filter((tab) => !tab.disabled)
      .reduce((map, tab) => ({ ...map, [tab.id]: tab.children }), {});
  }, [children]);

  useEffect(() => {
    if (activeTab && Object.keys(tabMap).includes(activeTab)) {
      setActive(activeTab);
    } else {
      let firstSelectable = null;
      if (pinned) {
        firstSelectable = pinned.find((tab) => !getChildProps(tab).disabled);
      }
      if (!firstSelectable && tabs) {
        firstSelectable = tabs.find((tab) => !getChildProps(tab).disabled);
      }
      if (firstSelectable) {
        setActive(getChildProps(firstSelectable).id);
      }
    }
  }, [activeTab, tabMap, pinned, tabs]);

  const changeActiveTab = (id: string) => {
    setActive(id);
    onActiveChange && onActiveChange(id);
  };

  const changeTab = (e: MouseEvent) => {
    const tab = e.currentTarget as HTMLElement;
    if (tab.dataset.id) {
      const id = tab.dataset.id;
      if (onBeforeChange) {
        const ret = onBeforeChange(active, id);
        if (ret instanceof Promise) {
          ret.then((b) => b && changeActiveTab(id));
        } else if (!isFalse(ret)) {
          changeActiveTab(id);
        }
      } else {
        changeActiveTab(id);
      }
    }
  };

  return (
    <div className={`ax-tab__panel ${className}`} data-align={align}>
      <div className="ax-tab__bar" data-align={align}>
        {prepend && <div className="ax-tab__bar--prepend">{prepend}</div>}
        <div className="ax-tab__bar--pinned">
          {pinned.map((tab: AnyObject) =>
            cloneElement(tab, {
              onClick: changeTab,
              "data-active": tab.props.id === active
            })
          )}
        </div>
        <div className="ax-tab__bar--scroller">
          {tabs.map((tab: AnyObject) =>
            cloneElement(tab, {
              onClick: changeTab,
              "data-active": tab.props.id === active
            })
          )}
        </div>
        {append && <div className="ax-tab__bar--append">{append}</div>}
      </div>
      {active ? tabMap[active] : null}
    </div>
  );
};
AxTabPanel.Tab = Tab;
AxTabPanel.displayName = "AxTabPanel";
