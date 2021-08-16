// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, useMemo } from "react";
import { AllColors, ElementProps, Font } from "../types";

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
    return cls.join(" ");
  }, [bg, className, color, font, forDisplay, level]);

  return (
    <div className={classes} {...aria}>
      {children}
    </div>
  );
};
AxHeading.displayName = "AxHeading";
