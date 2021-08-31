// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty } from "@axux/utilities";
import { forwardRef, MouseEventHandler, useEffect, useMemo, useState, VFC } from "react";
import { AxTooltip } from "../overlays/Tooltip";
import { AllColors, ElementProps, RefProp, Size } from "../types";
import { AxIcon } from "./Icon";

/** @internal */
export interface AvatarProps extends RefProp, ElementProps {
  /**
   * Avatar image
   */
  image?: string;
  /**
   * Avatar icon
   */
  icon?: string | JSX.Element;
  /**
   * Avatar title
   * when no image available will default to two characters from title
   */
  title: string;
  /**
   * Avatar size
   */
  size?: Size;
  /**
   * Avatar background
   */
  bg?: AllColors;
  /**
   * Avatar color
   */
  color?: AllColors;
  /**
   * Click handler
   */
  onClick?: MouseEventHandler;
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
}

/**
 * Avatar
 * @param icon
 * @param image
 * @param title
 * @param size
 * @param bg
 * @param color
 * @param className
 * @param onClick
 * @constructor
 * @internal
 */
export const AxAvatar: VFC<AvatarProps> = forwardRef<HTMLElement, AvatarProps>(
  (
    {
      icon,
      image,
      title,
      onClick,
      className = "",
      size = "normal",
      color = "",
      bg = "",
      topLeft,
      topRight,
      bottomRight,
      bottomLeft
    },
    ref
  ) => {
    const [src, setSrc] = useState(image);
    useEffect(() => setSrc(image), [image]);
    const classes = useMemo(() => {
      const cls = ["ax-avatar", `ax-avatar--${size}`, className];
      if (bg) {
        cls.push(`ax-bg--${bg}`);
        cls.push(color ? `ax-color--${color}` : `ax-color--contrast`);
      } else if (color) {
        cls.push(`ax-color--${color}`);
        cls.push("ax-bg--lightest");
      } else {
        cls.push("ax-bg--medium");
        cls.push("ax-color--base");
      }
      return cls.join(" ");
    }, [className, size, bg, color]);
    const fallback = useMemo(() => {
      const list: string[] = title.trim().split(" ");
      const first = list[0];
      const last = list.length > 1 && list.pop();
      return (
        first && last ? `${first.charAt(0)}${last.charAt(0)}` : `${first.substr(0, 2)}`
      ).toUpperCase();
    }, [title]);
    const body = useMemo(() => {
      if (!isEmpty(src)) {
        return <img alt={title} src={src} onError={() => setSrc("")} />;
      } else if (!isEmpty(icon)) {
        return <AxIcon icon={icon} />;
      } else {
        return <span>{fallback}</span>;
      }
    }, [fallback, icon, src, title]);
    return (
      <AxTooltip content={title} ref={ref} isDisabled={!title}>
        <div className={classes} data-clickable={!isEmpty(onClick)} onClick={onClick}>
          {body}

          {topLeft && <AxIcon className="ax-avatar--topLeft" icon={topLeft} />}
          {topRight && <AxIcon className="ax-avatar--topRight" icon={topRight} />}
          {bottomLeft && <AxIcon className="ax-avatar--bottomLeft" icon={bottomLeft} />}
          {bottomRight && <AxIcon className="ax-avatar--bottomRight" icon={bottomRight} />}
        </div>
      </AxTooltip>
    );
  }
);
AxAvatar.displayName = "AxAvatar";

// TODO: Added rounded icon allow JSX.Element for info icons
