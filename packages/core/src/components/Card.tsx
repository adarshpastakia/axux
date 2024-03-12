/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
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
  /**
   * make card draggable
   */
  draggable?: boolean;
  /**
   * drag event data key
   */
  dragKey?: string;
  /**
   * drag event data
   */
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
      [rest, isPlain, isActive, className],
    );
    return <Link {...props} ref={ref} />;
  },
);
AxCard.displayName = "AxCard";
