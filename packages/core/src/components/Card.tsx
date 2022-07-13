/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { forwardRef, useMemo } from "react";
import { ChildrenProp, ElementProps, MouseProps } from "../types";
import { Link } from "./Link";

export interface CardProps extends ElementProps, MouseProps, ChildrenProp {
  /**
   * routing path
   */
  to?: string;
  /**
   * navigation url
   */
  href?: string;
  /**
   * navigation target
   */
  target?: HTMLAnchorElement["target"];
  /**
   * no border/shadow
   */
  isPlain?: boolean;
  /**
   * highlight shadow
   */
  isActive?: boolean;
}

export const AxCard = forwardRef<HTMLElement, CardProps>(
  ({ className, isActive, isPlain, ...rest }, ref) => {
    const props = useMemo(
      () => ({
        ...rest,
        "data-plain": isPlain,
        "data-active-shadow": isActive,
        "data-clickable": !!rest.onClick,
        className: `ax-card ${className ?? ""}`,
      }),
      [rest, isPlain, isActive, className]
    );
    return <Link {...props} ref={ref} />;
  }
);
