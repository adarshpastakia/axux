/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { iconToken } from "@axux/utilities";
import { Menu } from "@headlessui/react";
import { FC, Fragment } from "react";
import { usePopover } from "../hooks/usePopover";
import { usePropToggle } from "../hooks/usePropToggle";
import { AxIcon } from "../icons/Icon";
import { AxTooltip } from "../overlays/Tooltip";
import { AppIcons } from "../types/appIcons";
import { Ellipsis } from "../typography/Ellipsis";
import { MenuGroupProps } from "./types";

const CollapseGroup: FC<MenuGroupProps> = ({
  isCollapsed,
  onCollapse,
  children,
  className,
  label,
  icon,
  rtlFlip,
  ...rest
}) => {
  const [collapsed, toggleCollapse] = usePropToggle(isCollapsed, onCollapse);
  return (
    <Fragment>
      <div
        className="ax-menu__group prevent-close"
        data-plain="false"
        onClick={toggleCollapse}
      >
        <AxIcon className="ax-menu__icon" icon={icon ?? ""} rtlFlip={rtlFlip} />
        <Ellipsis className="ax-menu__label">{label}</Ellipsis>
        <AxIcon
          icon={collapsed ? AppIcons.iconCaretRight : AppIcons.iconCaretDown}
          rtlFlip
        />
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
  ...rest
}) => {
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
        <Ellipsis className="ax-menu__label">{label}</Ellipsis>
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
  ...rest
}) => {
  const {
    attributes,
    setPopperElement,
    setReferenceElement,
    referenceElement,
    styles,
  } = usePopover({
    placement: "right-start",
    sameWidth: false,
    hideArrow: true,
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
            <Ellipsis className="ax-menu__label">{label}</Ellipsis>
            <AxIcon icon={AppIcons.iconCaretRight} rtlFlip />
          </div>
        )}
      </Menu.Button>
      <Menu.Items
        className={`popover ax-menu__popover`}
        ref={setPopperElement as AnyObject}
        onClick={() =>
          referenceElement?.dispatchEvent(
            new Event("closeParentGroup", { bubbles: true })
          )
        }
        style={styles.popper}
        {...attributes.popper}
      >
        <div {...rest} className={`popover__container ${className ?? ""}`}>
          {children}
        </div>
      </Menu.Items>
    </Menu>
  );
};

const MiniGroup: FC<MenuGroupProps> = ({
  children,
  className,
  label,
  icon,
  rtlFlip,
  ...rest
}) => {
  const { attributes, setPopperElement, setReferenceElement, styles } =
    usePopover({
      placement: "right-start",
      sameWidth: false,
      hideArrow: true,
    });
  return (
    <Menu as={Fragment}>
      <Menu.Button as={Fragment} {...{ ref: setReferenceElement }}>
        {({ open }) => (
          <div className="ax-menu__mini" data-popover-open={open}>
            <AxTooltip content={label} placement="right">
              <div
                onClick={(e) => e.currentTarget.dispatchEvent(e.nativeEvent)}
              >
                <AxIcon
                  className="ax-menu__icon"
                  icon={icon ?? iconToken(label)}
                  rtlFlip={rtlFlip}
                />
              </div>
            </AxTooltip>
          </div>
        )}
      </Menu.Button>
      <Menu.Items
        className={`popover ax-menu__popover`}
        ref={setPopperElement as AnyObject}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className={`popover__container ${className ?? ""}`} {...rest}>
          {children}
        </div>
      </Menu.Items>
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
