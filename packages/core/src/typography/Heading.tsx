// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, useMemo } from "react";
import { AllColors, ElementProps, Font, TextAlign, TextTransform } from "../types";

/** @internal */
export interface HeadingProps extends ElementProps {
  /**
   * Heading size
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Display heading
   */
  forDisplay?: boolean;
  /**
   * Font family
   */
  font?: Font;
  /**
   * Background color
   */
  bg?: AllColors;
  /**
   * Text color
   */
  color?: AllColors;

  align?: TextAlign;
  transform?: TextTransform;
}

/**
 * Heading block
 * @param children
 * @param className
 * @param level
 * @param forDisplay
 * @param font
 * @param bg
 * @param color
 * @param align
 * @param transform
 * @param aria-*
 * @constructor
 * @internal
 */
export const AxHeading: FC<HeadingProps> = ({
  children,
  className,
  level = 4,
  forDisplay,
  font,
  bg,
  color,
  align,
  transform,
  ...aria
}) => {
  const classes = useMemo(() => {
    const cls = [`ax-${forDisplay ? "display" : "heading"}--${level}`, className ?? ""];
    if (font) {
      cls.push(`ax-font--${font}`);
    }
    if (bg) {
      cls.push(`ax-bg--${bg}`);
    }
    if (color) {
      cls.push(`ax-color--${color}`);
    }
    if (align) {
      cls.push(`ax-align--${align}`);
    }
    if (transform) {
      cls.push(`ax-text--${transform}`);
    }
    return cls.join(" ");
  }, [align, bg, className, color, font, forDisplay, level, transform]);

  return (
    <div className={classes} {...aria}>
      {children}
    </div>
  );
};
AxHeading.displayName = "AxHeading";
