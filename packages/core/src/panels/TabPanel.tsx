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
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useBadge } from "../hooks/useBadge";
import { useTooltip } from "../hooks/useTooltip";
import { AxIcon } from "../icons/Icon";
import {
  BadgeType,
  CallbackReturn,
  ChildrenProp,
  CloseX,
  ElementProps,
  EmptyCallback,
  IconProp,
} from "../types";

export interface TabProps extends ChildrenProp, IconProp, ElementProps {
  id?: string;
  label?: string;
  tooltip?: string;
  badge?: BadgeType;
  isPinned?: boolean;
  isDisabled?: boolean;
  onClose?: EmptyCallback;
}

type TabChildren = ReactElement<TabProps> | undefined;

export interface TabPanelProps extends ElementProps {
  children: TabChildren | TabChildren[];
  align?: "start" | "end" | "center";
  placement?: "top" | "bottom" | "start" | "end";
  barClassName?: HTMLDivElement["className"];
  activeStyle?: "outline" | "solid";
  activeTab?: string;
  append?: JSX.Element;
  prepend?: JSX.Element;
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
  // @ts-ignore
  onClick,
  // @ts-ignore
  isActive,
  // @ts-ignore
  isVertical,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const Badge = useBadge(badge);
  const Wrapper = useTooltip(
    isVertical ? tooltip ?? label : tooltip,
    isDisabled,
    isVertical ? "right" : "bottom"
  );

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
    <Wrapper innerRef={buttonRef}>
      <button
        {...rest}
        ref={buttonRef}
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
        {onClose && CloseX(onClose)}
      </button>
    </Wrapper>
  );
};

export const AxTabPanel: FC<TabPanelProps> & { Tab: FC<TabProps> } = ({
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
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(activeTab);
  const [, startTransition] = useTransition();

  const tabMap = useMemo(() => {
    return Children.toArray(children).reduce<KeyValue>(
      (map, tab: AnyObject) => ({
        ...map,
        [tab.props.id ?? tab.key]: { id: tab.key, ...tab.props },
      }),
      {}
    );
  }, [children]);

  useLayoutEffect(() => {
    startTransition(() => {
      if (active) {
        const el = panelRef.current;
        onActiveChange && onActiveChange(active);
        setTimeout(
          () =>
            el &&
            el.dispatchEvent(new Event("updatePopper", { bubbles: true })),
          10
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
      if (onBeforeChange) {
        const ret = onBeforeChange(active, id);
        Promise.resolve(ret).then((b) => {
          if (!isFalse(b)) {
            setActive(id);
          }
        });
      } else {
        setActive(id);
      }
    },
    [onBeforeChange, active]
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
        {Children.toArray(children).map((tab: AnyObject) =>
          cloneElement(tab, {
            onClick: changeTab,
            key: tab.props.id || tab.key,
            id: tab.props.id ?? tab.key,
            isVertical: placement === "start" || placement === "end",
            isActive: (tab.props.id ?? tab.key) === active,
          } as AnyObject)
        )}
        {append}
      </div>
      <div className="ax-tab__body">
        {active && tabMap[active] ? tabMap[active].children : null}
      </div>
    </div>
  );
};
AxTabPanel.Tab = Tab;
