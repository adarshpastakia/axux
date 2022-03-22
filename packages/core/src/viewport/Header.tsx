// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isString } from "@axux/utilities";
import { FC, Fragment, isValidElement, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { ElementProps } from "../types";
import { AxText } from "../typography/Text";

/** @internal */
export interface ViewportHeaderProps extends ElementProps {
  /**
   * Root href
   */
  href?: string;
  /**
   * Application icon
   */
  icon?: string | JSX.Element;
  /**
   * Application title
   */
  title?: string | JSX.Element;
  /**
   * Application subtitle
   */
  subTitle?: string | JSX.Element;
}

/**
 * Viewport header
 * @param className
 * @param href
 * @param icon
 * @param title
 * @param subTitle
 * @param children
 * @param aria
 * @constructor
 * @internal
 */
export const AxViewportHeader: FC<ViewportHeaderProps> = ({
  className,
  href,
  icon,
  title,
  subTitle,
  children,
  ...aria
}) => {
  const AppTitle = useMemo(
    () => (
      <Fragment>
        {icon && (
          <div className="ax-viewport__header__icon">
            {isString(icon) && <img alt="Application logo" src={icon} />}
            {isValidElement(icon) && icon}
          </div>
        )}
        {title && (
          <div>
            {isString(title) && (
              <Fragment>
                <div className="ax-viewport__header__title">{title}</div>
                <div className="ax-viewport__header__subtitle">{subTitle}</div>
              </Fragment>
            )}
            {isValidElement(title) && title}
          </div>
        )}
      </Fragment>
    ),
    [icon, subTitle, title]
  );
  return (
    <div className={`ax-viewport__header ${className ?? ""}`} {...aria}>
      {(icon || title) &&
        (!!href ? <NavLink to={href}>{AppTitle}</NavLink> : <AxText>{AppTitle}</AxText>)}
      {children && <div className="ax-viewport__header__optionsBox">{children}</div>}
    </div>
  );
};