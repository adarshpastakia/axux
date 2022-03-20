// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isColor, isNumber, isString, isSvgPath, isTrue } from "@axux/utilities";
import { forwardRef, isValidElement, MouseEventHandler, useMemo } from "react";
import { BadgeType, useBadge } from "../internals/useBadge";
import { AllColors, ElementProps, RefProp, Size, SizeList, VFC } from "../types";

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
  size?: Size | number | string;
  /**
   * SVG viewBox
   */
  viewBox?: string;
  /**
   * Use image
   */
  useImage?: boolean;
  /**
   * Rounded icon
   */
  round?: boolean;
  /**
   * Apply spin animation, linear or steps by count
   */
  spin?: boolean | number;
  /**
   * Click handler
   */
  onClick?: MouseEventHandler;

  /**
   * Badge indicator
   */
  badge?: BadgeType;
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
 * @param round
 * @param onClick
 * @constructor
 * @internal
 */
export const AxIcon: VFC<IconProps> = forwardRef<HTMLElement, IconProps>(
  (
    {
      icon,
      color,
      size,
      useImage,
      viewBox = "0 0 24 24",
      className,
      round,
      spin,
      onClick,
      badge,
      ...aria
    },
    ref
  ) => {
    const badgeEl = useBadge(badge);
    const classes = useMemo(() => {
      const cls = ["ax-icon", className ?? ""];
      if (color) {
        cls.push(`ax-color--${color}`);
      }
      if (round) {
        cls.push(`ax-icon--round`);
      }
      if (isString(size) && SizeList.includes(size ?? "")) {
        cls.push(`ax-icon--${size}`);
      }
      if (isTrue(spin)) {
        cls.push("ax-anim--spin");
      }
      if (isNumber(spin)) {
        cls.push("ax-anim--spin-step");
      }
      return cls.join(" ");
    }, [className, color, round, size, spin]);
    const isSvg = useMemo(() => {
      return isSvgPath(icon);
    }, [icon]);

    const iconEl = useMemo(() => {
      if (!isString(icon) && isValidElement(icon)) {
        return icon;
      }
      return isSvg ? (
        <svg viewBox={viewBox}>
          <path fill="currentColor" d={icon.toString()} />
        </svg>
      ) : useImage ||
        icon?.toString().startsWith("http") ||
        icon?.toString().includes(".svg") ||
        icon?.toString().includes(".png") ||
        icon?.toString().startsWith("data:image") ? (
        <img src={icon.toString()} alt={icon.toString()} loading="lazy" />
      ) : icon?.toString().length <= 4 ? (
        <svg viewBox="0 0 1em 1em">
          <text
            x="50%"
            y="50%"
            dy=".075em"
            dominantBaseline="middle"
            textAnchor="middle"
            style={{ fontSize: ".75em" }}
          >
            {icon}
          </text>
        </svg>
      ) : (
        <i className={`${icon}`} />
      );
    }, [icon, isSvg, useImage, viewBox]);

    const styles = useMemo(() => {
      const s: KeyValue = {};
      if (color && isColor(color)) {
        s.color = color;
      }
      if (!SizeList.includes(`${size}`)) {
        s.fontSize = size;
      }
      if (spin) {
        s["--spin-steps"] = spin;
      }
      return s;
    }, [color, size, spin]);

    return (
      <div {...aria} className={classes} onClick={onClick} ref={ref as AnyObject} style={styles}>
        {iconEl}
        {badgeEl}
      </div>
    );
  }
);
AxIcon.displayName = "AxIcon";
