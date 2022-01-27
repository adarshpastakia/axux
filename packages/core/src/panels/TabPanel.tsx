// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isFalse } from "@axux/utilities";
import { getChildProps } from "@axux/utilities/dist/react";
import { Children, cloneElement, FC, useEffect, useMemo, useState } from "react";
import { AxIcon } from "../icons/Icon";
import { BadgeType, useBadge } from "../internals/useBadge";
import { AxLoader } from "../loader/Loader";
import { AxTooltip } from "../overlays/Tooltip";
import { AxSection } from "../page/Section";
import { ElementProps, EmptyCallback, IconProps } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface TabProps extends IconProps, ElementProps {
  id: string;
  label?: string;
  tooltip?: string;
  badge?: BadgeType;
  isPinned?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClose?: EmptyCallback;
}

/**
 * Tab button
 * @internal
 */
export const Tab: FC<TabProps & { placement?: "left" | "bottom" }> = ({
  id,
  icon,
  label,
  tooltip,
  badge,
  className,
  isLoading = false,
  isPinned = false,
  isDisabled = false,
  onClose,
  placement = "bottom",
  ...props
}) => {
  const badgeEl = useBadge(badge);

  return (
    <AxTooltip content={tooltip ?? ""} isDisabled={!tooltip} placement={placement}>
      <a
        className={`ax-tab__button ${className ?? ""}`}
        {...props}
        key={id}
        data-id={id}
        data-pinned={isPinned}
        data-loading={isLoading}
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
    </AxTooltip>
  );
};
Tab.displayName = "AxTabPanel.Tab";

/** @internal */
export interface TabPanelProps extends Pick<ElementProps, "className"> {
  /**
   * @default "top"
   */
  align?: "top" | "bottom" | "start" | "end";

  iconOnly?: boolean;

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
  className,
  align = "top",
  activeTab,
  onBeforeChange,
  onActiveChange,
  prepend,
  append
}) => {
  const [active, setActive] = useState(activeTab);

  const pinned = useMemo(() => {
    return Children.toArray(children).filter((child) => getChildProps(child).isPinned);
  }, [children]);
  const tabs = useMemo(() => {
    return Children.toArray(children).filter((child) => !getChildProps(child).isPinned);
  }, [children]);

  const tabMap = useMemo(() => {
    return Children.toArray(children)
      .map(getChildProps)
      .filter((tab) => !tab.isDisabled)
      .reduce((map, tab) => ({ ...map, [tab.id]: tab }), {});
  }, [children]);

  useEffect(() => {
    if (activeTab && activeTab in tabMap) {
      setActive(activeTab);
    } else {
      let firstSelectable = null;
      if (pinned) {
        firstSelectable = pinned.find((tab) => !getChildProps(tab).disabled);
      }
      if (!firstSelectable && tabs) {
        firstSelectable = tabs.find((tab) => !getChildProps(tab).isDisabled);
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

  const isCurrentLoading = useMemo(() => {
    if (active && active in tabMap) {
      return tabMap[active].isLoading;
    }
    return false;
  }, [active, tabMap]);

  return (
    <div className={`ax-tab__panel ${className ?? ""}`} data-align={align}>
      <div className="ax-tab__bar" data-align={align}>
        {prepend && <div className="ax-tab__bar--prepend">{prepend}</div>}
        <div className="ax-tab__bar--pinned">
          {pinned.map((tab: AnyObject) =>
            cloneElement(tab, {
              onClick: changeTab,
              placement: align === "start" || align === "end" ? "left" : "bottom",
              "data-active": tab.props.id === active
            })
          )}
        </div>
        <div className="ax-tab__bar--scroller">
          {tabs.map((tab: AnyObject) =>
            cloneElement(tab, {
              onClick: changeTab,
              placement: align === "start" || align === "end" ? "left" : "bottom",
              "data-active": tab.props.id === active
            })
          )}
        </div>
        {append && <div className="ax-tab__bar--append">{append}</div>}
      </div>
      <AxSection>
        {isCurrentLoading && <AxLoader />}
        {active ? tabMap[active].children : null}
      </AxSection>
    </div>
  );
};
AxTabPanel.Tab = Tab;
AxTabPanel.displayName = "AxTabPanel";
