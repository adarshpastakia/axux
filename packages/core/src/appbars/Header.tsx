// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, Fragment, useMemo } from "react";
import { AxButton } from "../buttons/Button";
import { AxDivider } from "../divider/Divider";
import { AxIcon } from "../icons/Icon";
import { AllColors, ElementProps, EmptyCallback, IconProps } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface HeaderProps extends IconProps, ElementProps {
  /**
   * Header title
   */
  title?: string | JSX.Element;
  /**
   * Header background
   */
  bg?: AllColors;
  /**
   * Text color
   */
  color?: AllColors;
  /**
   * Icon background
   */
  iconBg?: AllColors;
  /**
   * Icon color
   */
  iconColor?: AllColors;
  /**
   *
   */
  onBack?: EmptyCallback;
  onClick?: EmptyCallback;
}

/**
 * Header bar
 * @param title
 * @param icon
 * @param children
 * @param bg
 * @param color
 * @param onBack
 * @param iconBg
 * @param iconColor
 * @param onClick
 * @param className
 * @param aria-*
 * @constructor
 * @internal
 */
export const AxHeader: FC<HeaderProps> = ({
  title,
  icon,
  children,
  bg,
  color,
  onBack,
  iconBg,
  iconColor,
  onClick,
  className,
  ...aria
}) => {
  const classes = useMemo(() => {
    const cls = ["ax-header", className ?? ""];
    if (bg) {
      cls.push(`ax-bg--${bg}`);
      if (!color) {
        cls.push(`ax-color--contrast`);
      }
    }
    if (color) {
      cls.push(`ax-color--${color}`);
    }
    return cls.join(" ");
  }, [bg, color]);
  const iconClasses = useMemo(() => {
    const cls = ["ax-header__icon"];
    if (iconBg) {
      cls.push(`ax-bg--${iconBg}`);
      if (!iconColor) {
        cls.push(`ax-color--contrast`);
      }
    }
    if (iconColor) {
      cls.push(`ax-color--${iconColor}`);
    }
    return cls.join(" ");
  }, [iconBg, iconColor]);

  return (
    <div className={classes} {...aria}>
      {onBack && (
        <Fragment>
          <AxButton
            type="link"
            icon={AppIcons.iconCaretLeft}
            color="primary"
            onClick={onBack}
            className="ax-header__back ax-prevent-close"
          />
          <AxDivider vertical />
        </Fragment>
      )}
      {icon && (
        <div className={iconClasses}>
          <AxIcon icon={icon} />
        </div>
      )}
      <div className={`ax-header__title ${!!onClick ? "ax-clickable" : ""}`} onClick={onClick}>
        {title}
      </div>
      {children && <div className="ax-header__actions">{children}</div>}
    </div>
  );
};
