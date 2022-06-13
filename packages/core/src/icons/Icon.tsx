// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isColor, isNumber, isString, isSvgPath, isTrue } from "@axux/utilities";
import { forwardRef, MouseEventHandler, useMemo } from "react";
import { BadgeType, useBadge } from "../internals/useBadge";
import { AllColors, ElementProps, RefProp, Size, SizeList, VFC } from "../types";

/** @internal */
export interface IconProps extends RefProp, ElementProps {
  /**
   * SVG path or image url or icon font class
   */
  icon: string | JSX.Element;
  /**
   * Background
   */
  bg?: AllColors;
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

  role?: string;
  rtlFlip?: boolean;
}

/**
 * Icon
 * @internal
 */
export const AxIcon: VFC<IconProps> = forwardRef<HTMLElement, IconProps>(
  (
    {
      icon,
      color,
      bg,
      size,
      rtlFlip,
      useImage,
      viewBox = "0 0 24 24",
      className,
      round,
      spin,
      onClick,
      badge,
      role,
      ...aria
    },
    ref
  ) => {
    const badgeEl = useBadge(badge);
    const classes = useMemo(() => {
      const cls = ["ax-icon", className ?? ""];
      if (bg && !isColor(bg)) {
        cls.push(`ax-bg--${bg}`);
        cls.push(color && !isColor(color) ? `ax-color--${color}` : `ax-color--contrast`);
      } else if (color && !isColor(color)) {
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
      if (rtlFlip) {
        cls.push("flippable");
      }
      return cls.join(" ");
    }, [className, color, round, rtlFlip, size, spin]);
    const isSvg = useMemo(() => {
      return isSvgPath(icon);
    }, [icon]);

    const iconEl = useMemo(() => {
      if (!isString(icon)) {
        throw Error("Invalid icon expected string");
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
        <svg>
          <text x="50%" y="50%" dy=".075em" dominantBaseline="middle" textAnchor="middle">
            {icon}
          </text>
        </svg>
      ) : (
        <i className={`${icon}`} />
      );
    }, [icon, isSvg, useImage, viewBox]);

    const styles = useMemo(() => {
      const s: KeyValue = {};
      if (bg && isColor(bg)) {
        s.backgroundColor = bg;
      }
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
      <div
        {...aria}
        role={role}
        className={classes}
        onClick={onClick}
        ref={ref as AnyObject}
        style={styles}
      >
        {iconEl}
        {badgeEl}
      </div>
    );
  }
);
AxIcon.displayName = "AxIcon";
