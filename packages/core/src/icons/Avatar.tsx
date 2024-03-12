/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { isColor } from "@axux/utilities";
import { useMemo, useState, type FC } from "react";
import BoringAvatar from "boring-avatars";
import { SizeList, type Color, type ElementProps } from "../types";
import { AxIcon } from "./Icon";

export interface AvatarProps extends ElementProps {
  img?: string;
  icon?: string;
  variant?: "beam" | "pixel" | "bauhaus";
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
}

export const AxAvatar: FC<AvatarProps> = ({
  img,
  icon,
  bg,
  color,
  size = "",
  variant = "beam",
  className,
  ...rest
}) => {
  const [state, setState] = useState(true);
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

  /** ***************** render icon *******************/
  const iconEl = useMemo(() => {
    setState(!!img);
    return (
      <img
        src={img}
        alt={img}
        onLoad={(e: AnyObject) => (e.target.dataset.show = "true")}
        onError={() => setState(false)}
      />
    );
  }, [img]);

  /** ***************** component *******************/
  return (
    <span
      {...rest}
      role="presentation"
      className={`ax-avatar ${className ?? ""}`}
      style={styles}
    >
      {state && iconEl}
      {!state && icon && <AxIcon icon={icon} />}
      {!state && !icon && (
        <BoringAvatar square size={64} variant={variant} name={img ?? icon} />
      )}
    </span>
  );
};

AxAvatar.displayName = "AxAvatar";
