/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isColor, isString, isSvgPath } from "@axux/utilities";
import { type FC, forwardRef, type MouseEventHandler, useMemo } from "react";
import { type Color, type ElementProps, type IconProp, type RefProp, SizeList } from "../types";

const SvgTextSize = ["", ".75em", ".65em", ".45em", ".45em"];

export interface IconProps extends IconProp, ElementProps {
  /**
   * background
   */
  bg?: Color | string;
  /**
   * color
   */
  color?: Color | string;
  /**
   * icon size
   */
  size?: number | string;
  /**
   * SVG viewBox
   */
  viewBox?: string;
  /**
   * apply animation
   */
  animate?: "spin" | "bounce";
  /**
   * Click handler
   */
  onClick?: MouseEventHandler;
}

export const AxIcon: FC<IconProps & RefProp> = forwardRef<
  HTMLElement,
  IconProps
>(
  (
    {
      icon,
      bg,
      color,
      size = "",
      rtlFlip,
      viewBox = "0 0 24 24",
      className,
      onClick,
      ...rest
    },
    ref
  ) => {
    /** ***************** style map *******************/
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
      return s;
    }, [bg, color, size]);

    /** ***************** check if icon is svg path *******************/
    const isSvg = useMemo(() => {
      return isSvgPath(icon);
    }, [icon]);

    /** ***************** render icon *******************/
    const iconEl = useMemo(() => {
      if (!isString(icon)) {
        throw Error("Invalid icon expected string");
      }
      return isSvg ? (
        <svg viewBox={viewBox}>
          <path fill="currentColor" d={icon.toString()} />
        </svg>
      ) : icon?.toString().startsWith("http") ||
        icon?.toString().includes(".svg") ||
        icon?.toString().includes(".png") ||
        icon?.toString().startsWith("data:image") ? (
        <img src={icon.toString()} alt={icon.toString()} loading="lazy" />
      ) : icon?.toString().length <= 4 ? (
        <svg>
          <text
            x="50%"
            y="50%"
            dy=".075em"
            dominantBaseline="middle"
            textAnchor="middle"
            style={{ fontSize: SvgTextSize[icon.length] ?? "1em" }}
          >
            {icon}
          </text>
        </svg>
      ) : (
        <i className={`${icon}`} />
      );
    }, [icon, isSvg, viewBox]);

    /** ***************** component *******************/
    return (
      <span
        {...rest}
        role="presentation"
        className={`ax-icon ${className ?? ""}`}
        onClick={onClick}
        data-flip={rtlFlip}
        ref={ref as AnyObject}
        style={styles}
      >
        {iconEl}
      </span>
    );
  }
);

AxIcon.displayName = "AxIcon";
