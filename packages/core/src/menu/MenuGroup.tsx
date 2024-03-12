/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { iconToken } from "@axux/utilities";
import { Menu } from "@headlessui/react";
import { Fragment, type FC } from "react";
import { createPortal } from "react-dom";
import { useGlobals } from "../context/Global";
import { useBadge } from "../hooks/useBadge";
import { usePopover } from "../hooks/usePopover";
import { usePropToggle } from "../hooks/usePropToggle";
import { AxIcon } from "../icons/Icon";
import { AppIcons } from "../types/appIcons";
import { type MenuGroupProps } from "./types";

const CollapseGroup: FC<MenuGroupProps> = ({
  isCollapsed,
  onCollapse,
  children,
  className,
  label,
  icon,
  rtlFlip,
  badge,
  ...rest
}) => {
  const [collapsed, toggleCollapse] = usePropToggle(isCollapsed, onCollapse);
  const Badge = useBadge(badge);
  return (
    <Fragment>
      <div
        role="none"
        className="ax-menu__group prevent-close"
        data-plain="false"
        onClick={toggleCollapse}
      >
        <AxIcon className="ax-menu__icon" icon={icon ?? ""} rtlFlip={rtlFlip} />
        <div className="ax-menu__label">{label}</div>
        <AxIcon
          icon={collapsed ? AppIcons.iconCaretRight : AppIcons.iconCaretDown}
          rtlFlip
        />
        {Badge}
      </div>
      {!collapsed && (
        <div {...rest} className={`ax-menu ${className ?? ""}`}>
          {children}
        </div>
      )}
    </Fragment>
  );
};

const PlainGroup: FC<MenuGroupProps> = ({
  children,
  className,
  label,
  icon,
  rtlFlip,
  badge,
  ...rest
}) => {
  const Badge = useBadge(badge);

  return (
    <Fragment>
      <div className="ax-menu__group prevent-close" data-plain="true">
        {icon && (
          <AxIcon
            className="ax-menu__icon"
            icon={icon ?? ""}
            rtlFlip={rtlFlip}
          />
        )}
        <div className="ax-menu__label">{label}</div>
        {Badge}
      </div>
      <div {...rest} className={`ax-menu ${className ?? ""}`}>
        {children}
      </div>
    </Fragment>
  );
};

const FloatingGroup: FC<MenuGroupProps> = ({
  children,
  className,
  label,
  icon,
  rtlFlip,
  badge,
  ...rest
}) => {
  const { portalRoot } = useGlobals();
  const Badge = useBadge(badge);
  const {
    attributes,
    setPopperElement,
    setReferenceElement,
    referenceElement,
    styles,
  } = usePopover({
    placement: "right-start",
    sameWidth: false,
  });
  return (
    <Menu as={Fragment}>
      <Menu.Button as={Fragment} {...{ ref: setReferenceElement }}>
        {({ open }) => (
          <div
            className="ax-menu__group prevent-close"
            data-plain="false"
            data-popover-open={open}
          >
            <AxIcon
              className="ax-menu__icon"
              icon={icon ?? ""}
              rtlFlip={rtlFlip}
            />
            <div className="ax-menu__label">{label}</div>
            <AxIcon icon={AppIcons.iconCaretRight} rtlFlip />
            {Badge}
          </div>
        )}
      </Menu.Button>
      {portalRoot.current &&
        createPortal(
          <Menu.Items
            className={`ax-popover ax-menu__popover`}
            ref={setPopperElement as AnyObject}
            onClick={() =>
              referenceElement?.dispatchEvent(
                new Event("closeParentGroup", { bubbles: true }),
              )
            }
            style={styles.popper}
            {...attributes.popper}
          >
            <div
              {...rest}
              className={`ax-popover__container ${className ?? ""}`}
            >
              {children}
            </div>
          </Menu.Items>,
          portalRoot.current,
        )}
    </Menu>
  );
};

const MiniGroup: FC<MenuGroupProps> = ({
  children,
  className,
  label,
  icon,
  rtlFlip,
  badge,
  ...rest
}) => {
  const { portalRoot } = useGlobals();
  const Badge = useBadge(badge);
  const { attributes, setPopperElement, setReferenceElement, styles } =
    usePopover({
      placement: "right-start",
      sameWidth: false,
    });
  return (
    <Menu as={Fragment}>
      <Menu.Button as={Fragment} {...{ ref: setReferenceElement }}>
        {({ open }) => (
          <div
            className="ax-menu__mini"
            data-popover-open={open}
            data-tooltip={label}
            data-tooltip-placement="right"
            aria-controls={label}
          >
            <div
              role="none"
              onClick={(e) => {
                e.currentTarget
                  .closest(".ax-menu__mini")
                  ?.dispatchEvent(
                    new MouseEvent(e.nativeEvent.type, e.nativeEvent),
                  );
              }}
            >
              <AxIcon
                className="ax-menu__icon"
                icon={icon ?? iconToken(label)}
                rtlFlip={rtlFlip}
              />
            </div>
            {Badge}
          </div>
        )}
      </Menu.Button>
      {portalRoot.current &&
        createPortal(
          <Menu.Items
            className={`ax-popover ax-menu__popover`}
            ref={setPopperElement as AnyObject}
            style={styles.popper}
            {...attributes.popper}
          >
            <div
              className={`ax-popover__container ${className ?? ""}`}
              {...rest}
            >
              {children}
            </div>
          </Menu.Items>,
          portalRoot.current,
        )}
    </Menu>
  );
};

export const MenuGroup: FC<MenuGroupProps> = ({
  type = "divider",
  ...rest
}) => {
  switch (type) {
    case "collapsable":
      return <CollapseGroup {...rest} />;
    case "floating":
      return <FloatingGroup {...rest} />;
    case "mini":
      return <MiniGroup {...rest} />;
    default:
      return <PlainGroup {...rest} />;
  }
};
