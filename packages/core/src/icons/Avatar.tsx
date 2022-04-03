// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isColor, isEmpty } from "@axux/utilities";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState
} from "react";
import { AxTooltip } from "../overlays/Tooltip";
import { AllColors, ElementProps, IconType, RefProp, Size, VFC } from "../types";
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

  noBgForImage?: boolean;

  infograph?: {
    top?: IconType;
    bottom?: IconType;
    start?: IconType;
    end?: IconType;
    topStart?: IconType;
    topEnd?: IconType;
    bottomStart?: IconType;
    bottomEnd?: IconType;
  };
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
      title = "",
      onClick,
      className,
      size = "normal",
      color = "",
      bg = "",
      noBgForImage,
      infograph
    },
    ref
  ) => {
    const [src, setSrc] = useState(image);
    useEffect(() => setSrc(image), [image]);
    const classes = useMemo(() => {
      const cls = ["ax-avatar", `ax-avatar--${size}`, className];
      if (!(!!src && noBgForImage) && bg) {
        cls.push(`ax-bg--${bg}`);
        cls.push(color ? `ax-color--${color}` : `ax-color--contrast`);
      } else if (color) {
        cls.push(`ax-color--${color}`);
        cls.push("ax-bg--lightest");
      } else {
        cls.push("ax-bg--light");
        cls.push("ax-color--dark");
      }
      return cls.join(" ");
    }, [size, className, src, noBgForImage, bg, color]);
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
        return <img alt={title} src={src} onError={() => setSrc("")} loading="lazy" />;
      } else if (!isEmpty(icon)) {
        return <AxIcon icon={icon} />;
      } else {
        return (
          <svg>
            <text
              x="50%"
              y="50%"
              dy=".075em"
              dominantBaseline="middle"
              textAnchor="middle"
              style={{ fontSize: ".625em" }}
            >
              {fallback}
            </text>
          </svg>
        );
      }
    }, [fallback, icon, src, title]);
    const styles = useMemo(() => {
      const ret: KeyValue = {};
      if (!(!!src && noBgForImage) && bg && isColor(bg)) {
        ret.backgroundColor = bg;
      }
      if (color && isColor(color)) {
        ret.color = color;
      }
      return ret;
    }, [bg, color, noBgForImage, src]);
    return (
      <AxTooltip content={title} ref={ref} isDisabled={!title} usePortal>
        <div
          className={classes}
          data-clickable={!isEmpty(onClick)}
          onClick={onClick}
          style={styles}
        >
          {body}

          {infograph &&
            Object.entries(infograph).map(([key, icon]) =>
              isValidElement(icon) && icon.type === AxIcon
                ? cloneElement(icon as AnyObject, {
                    className: `ax-avatar--${key} ${((icon.props as AnyObject) ?? {}).className}`,
                    round: true
                  })
                : icon && <AxIcon key={key} className={`ax-avatar--${key}`} icon={icon} round />
            )}
        </div>
      </AxTooltip>
    );
  }
);
AxAvatar.displayName = "AxAvatar";
