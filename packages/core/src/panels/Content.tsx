// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isTrue } from "@axux/utilities";
import { FC, forwardRef, UIEvent, useMemo } from "react";
import { ElementProps, RefProp, Spacing } from "../types";
import { EmptyContent } from "./EmptyContent";

/** @internal */
export interface ContentProps extends ElementProps, RefProp<HTMLDivElement> {
  /**
   * @default true
   */
  scroll?: boolean;
  /**
   * @default true
   */
  padding?: Spacing;
  /**
   * Centered content
   */
  centered?: boolean;

  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
}

interface ContentFC extends FC<ContentProps> {
  Empty: typeof EmptyContent;
}

/**
 * Page content
 * @internal
 */
export const AxContent: ContentFC = forwardRef<HTMLDivElement | null, ContentProps>(
  (
    { children, className = "", centered, padding = true, scroll = true, onScroll, ...aria },
    ref
  ) => {
    const classes = useMemo(() => {
      const cls = ["ax-content", className ?? ""];
      if (padding) {
        cls.push(isTrue(padding) ? "ax-padding" : `ax-padding--${padding}`);
      }
      if (scroll) {
        cls.push("ax-scroll");
      }
      if (centered) {
        cls.push("ax-content--centered");
      }
      return cls.join(" ");
    }, [centered, className, padding, scroll]);
    return (
      <div ref={ref} className={classes} {...aria} onScroll={onScroll}>
        {children}
      </div>
    );
  }
) as AnyObject;
AxContent.Empty = EmptyContent;
AxContent.displayName = "AxContent";
AxContent.Empty.displayName = "AxContent.Empty";
