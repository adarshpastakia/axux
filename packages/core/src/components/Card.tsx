/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { forwardRef, useMemo } from "react";
import {
  type ChildrenProp,
  type ElementProps,
  type MouseProps,
} from "../types";
import { Link, type LinkProps } from "./Link";

export interface CardProps extends ElementProps, MouseProps, ChildrenProp {
  isPlain?: boolean;
  /**
   * highlight shadow
   */
  isActive?: boolean;
  /**
   * navigation props
   */
  nav?: LinkProps;

  draggable?: boolean;
  dragKey?: string;
  dragData?: KeyValue;
}

export const AxCard = forwardRef<HTMLElement, CardProps>(
  ({ className, isActive, isPlain, ...rest }, ref) => {
    const props = useMemo(
      () => ({
        ...rest,
        "data-plain": isPlain,
        "data-active-shadow": isActive,
        "data-clickable": !(rest.onClick == null),
        className: `ax-card ${className ?? ""}`,
      }),
      [rest, isPlain, isActive, className]
    );
    return <Link {...props} ref={ref} />;
  }
);
AxCard.displayName = "AxCard";
