// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isNumber, isString, isSvgPath, isTrue } from "@axux/utilities";
import { forwardRef, isValidElement, MouseEventHandler, useMemo, VFC } from "react";
import { AllColors, ElementProps, RefProp, Size, SizeList } from "../types";

/** @internal */
export interface IconProps extends RefProp, ElementProps {
  /**
   * SVG path or image url or icon font class
   */
  icon: string | JSX.Element;
  /**
   * Color
   */
  color?: AllColors;
  /**
   * Icon size
   */
  size?: Size;
  /**
   * SVG viewBox
   */
  viewBox?: string;
  /**
   * Use image
   */
  useImage?: boolean;
  /**
   * Apply spin animation, linear or steps by count
   */
  spin?: boolean | number;
  /**
   * Click handler
   */
  onClick?: MouseEventHandler;
}

/**
 * Icon
 * @param icon
 * @param color
 * @param size
 * @param viewBox
 * @param useImage
 * @param className
 * @param spin
 * @param onClick
 * @constructor
 * @internal
 */
export const AxIcon: VFC<IconProps> = forwardRef<HTMLElement, IconProps>(
  (
    { icon, color, size, useImage, viewBox = "0 0 24 24", className, spin, onClick, ...aria },
    ref
  ) => {
    const classes = useMemo(() => {
      const cls = ["ax-icon", className ?? ""];
      if (color) {
        cls.push(`ax-color--${color}`);
      }
      if (isString(size) && SizeList.includes(size ?? "")) {
        cls.push(`ax-font--${size}`);
      }
      if (isTrue(spin)) {
        cls.push("ax-anim--spin");
      }
      if (isNumber(spin)) {
        cls.push("ax-anim--spin-step");
      }
      return cls.join(" ");
    }, [className, color, size, spin]);
    const isSvg = useMemo(() => {
      return isSvgPath(icon);
    }, [icon]);

    const iconEl = useMemo(() => {
      if (!isString(icon) && isValidElement(icon)) {
        return <span>{icon}</span>;
      }
      return isSvg ? (
        <svg viewBox={viewBox}>
          <path fill="currentColor" d={icon.toString()} />
        </svg>
      ) : useImage ? (
        <img src={icon.toString()} alt={icon.toString()} />
      ) : (
        <i className={`${icon}`} />
      );
    }, [icon, isSvg, useImage, viewBox]);

    return (
      <div
        {...aria}
        className={classes}
        onClick={onClick}
        ref={ref as AnyObject}
        style={{ "--spin-steps": spin } as AnyObject}
      >
        {iconEl}
      </div>
    );
  }
);
AxIcon.displayName = "AxIcon";
