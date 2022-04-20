// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, Fragment, useMemo } from "react";
import { AxButton } from "../buttons/Button";
import { AxDivider } from "../divider/Divider";
import { useIcon } from "../hooks/useIcon";
import { AllColors, ElementProps, EmptyCallback, IconProps } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface HeaderProps extends IconProps<JSX.Element>, ElementProps {
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
  size?: "md" | "lg";
  onBack?: EmptyCallback;
}

/**
 * Header bar
 * @internal
 */
export const AxHeader: FC<HeaderProps> = ({
  title,
  icon,
  rtlFlip,
  children,
  bg,
  color,
  size,
  onBack,
  iconBg,
  iconColor,
  onClick,
  className,
  ...props
}) => {
  const classes = useMemo(() => {
    const cls = ["ax-header", className ?? ""];
    cls.push(`ax-bg--${bg ?? "panel"}`);
    if (!color) {
      cls.push(`ax-color--contrast`);
    }
    if (color) {
      cls.push(`ax-color--${color}`);
    }
    if (size) {
      cls.push(`ax-font--${size}`);
    }
    return cls.join(" ");
  }, [bg, className, color, size]);
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
  const iconEl = useIcon(icon, iconClasses, rtlFlip);

  return (
    <div className={classes} {...props}>
      {onBack && (
        <Fragment>
          <AxButton
            type="link"
            icon={AppIcons.iconCaretLeft}
            color="primary"
            onClick={onBack}
            aria-label="Back"
            className="ax-header__back ax-prevent-close flippable"
          />
          <AxDivider vertical />
        </Fragment>
      )}
      {iconEl}
      <div className={`ax-header__title ${!!onClick ? "ax-clickable" : ""}`} onClick={onClick}>
        {title}
      </div>
      {children && <div className="ax-header__actions">{children}</div>}
    </div>
  );
};
