/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isFalse } from "@axux/utilities";
import {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type FC,
  type ReactElement,
} from "react";
import { useBadge } from "../hooks/useBadge";
import { getTooltipProps } from "../hooks/useTooltip";
import { AxIcon } from "../icons/Icon";
import { Close } from "../internal/Close";
import {
  type BadgeType,
  type CallbackReturn,
  type ChildrenProp,
  type ElementProps,
  type EmptyCallback,
  type IconProp,
} from "../types";
import { AxErrorBoundary } from "../application/ErrorBoundary";

export interface TabProps extends ChildrenProp, IconProp, ElementProps {
  id?: string;
  label?: string;
  tooltip?: string;
  badge?: BadgeType;
  isPinned?: boolean;
  isDisabled?: boolean;
  onClose?: EmptyCallback;
}

type TabChildren = ReactElement<TabProps> | false | undefined;

export interface TabPanelProps extends ElementProps {
  children: TabChildren | TabChildren[];
  align?: "start" | "end" | "center";
  placement?: "top" | "bottom" | "start" | "end";
  barClassName?: HTMLDivElement["className"];
  activeStyle?: "outline" | "solid";
  activeTab?: string;
  append?: false | JSX.Element;
  prepend?: false | JSX.Element;
  onBeforeChange?: (oldKey?: string, newKey?: string) => CallbackReturn;
  onActiveChange?: (key: string) => void;
}

export const Tab: FC<TabProps> = ({
  id,
  label,
  tooltip,
  badge,
  children,
  isPinned,
  rtlFlip,
  icon,
  isDisabled,
  onClose,
  className,
  // @ts-expect-error ignore
  onClick,
  // @ts-expect-error ignore
  isActive,
  // @ts-expect-error ignore
  isVertical,
  ...rest
}) => {
  const Badge = useBadge(badge);
  const tooltipProps = useMemo(() => getTooltipProps(tooltip), [tooltip]);

  const fallback = useMemo(() => {
    if (label) {
      const list: string[] = label.trim().split(" ");
      const first = list[0];
      const last = list.length > 1 && list.pop();
      return (
        first && last
          ? `${first.charAt(0)}${last.charAt(0)}`
          : `${first.substr(0, 2)}`
      ).toUpperCase();
    }
  }, [label]);

  return (
    <button
      {...rest}
      {...tooltipProps}
      className={`ax-tab__button ${className ?? ""}`}
      data-active={isActive}
      data-disabled={isDisabled}
      onClick={() => onClick(id)}
    >
      {(isVertical || icon) && (
        <AxIcon rtlFlip={rtlFlip} icon={icon ?? fallback} />
      )}
      {!isVertical && label && <label>{label}</label>}
      {Badge}
      {onClose != null && Close(onClose)}
    </button>
  );
};

export const TabPanel: FC<TabPanelProps> = ({
  children,
  activeTab,
  align = "center",
  placement = "top",
  className,
  append,
  prepend,
  activeStyle,
  barClassName,
  onBeforeChange,
  onActiveChange,
  ...rest
}: TabPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(activeTab);
  const [, startTransition] = useTransition();

  const tabMap = useMemo(() => {
    return Children.toArray(children).reduce<KeyValue>(
      (map, tab: AnyObject) => ({
        ...map,
        [tab.props.id ?? tab.key]: { id: tab.key, ...tab.props },
      }),
      {},
    );
  }, [children]);

  useLayoutEffect(() => {
    startTransition(() => {
      if (active) {
        const el = panelRef.current;
        setTimeout(
          () => el?.dispatchEvent(new Event("updatePopper", { bubbles: true })),
          10,
        );
      }
    });
  }, [active]);

  useEffect(() => {
    if (activeTab && activeTab in tabMap) {
      setActive(activeTab);
    } else {
      let firstSelectable = null;
      if (tabMap) {
        firstSelectable = Object.values(tabMap).find((tab) => !tab.isDisabled);
      }
      if (firstSelectable) {
        setActive(firstSelectable.id);
      }
    }
  }, [activeTab, tabMap]);

  const changeTab = useCallback(
    (id: string) => {
      if (onBeforeChange != null) {
        const ret = onBeforeChange(active, id);
        void Promise.resolve(ret).then((b) => {
          if (!isFalse(b)) {
            setActive(id);
            onActiveChange?.(id);
          }
        });
      } else {
        setActive(id);
        onActiveChange?.(id);
      }
    },
    [onBeforeChange, onActiveChange, active],
  );

  return (
    <div
      {...rest}
      ref={panelRef}
      data-align={align}
      data-style={activeStyle}
      data-placement={placement}
      className={`ax-tab__panel ${className ?? ""}`}
    >
      <div className={`ax-tab__bar ${barClassName ?? ""}`}>
        {prepend}
        {Children.toArray(children)
          .filter(Boolean)
          .map((tab: AnyObject) =>
            cloneElement(tab, {
              onClick: changeTab,
              key: tab.props.id || tab.key,
              id: tab.props.id ?? tab.key,
              isVertical: placement === "start" || placement === "end",
              isActive: (tab.props.id ?? tab.key) === active,
            } as AnyObject),
          )}
        <span className="flex-auto" />
        {append}
      </div>
      <div className="ax-tab__body">
        <AxErrorBoundary>
          {active && tabMap[active] ? tabMap[active].children : null}
        </AxErrorBoundary>
      </div>
    </div>
  );
};

export const AxTabPanel = Object.assign(TabPanel, {
  Tab,
});

AxTabPanel.displayName = "AxTabPanel";
AxTabPanel.Tab.displayName = "AxTabPanel.Tab";
