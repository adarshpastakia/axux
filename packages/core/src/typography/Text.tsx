// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty, isNumber, isObject, isString } from "@axux/utilities";
import { FC, Fragment, useMemo } from "react";
import { AxTooltip, TooltipProps } from "../overlays/Tooltip";
import {
  AllColors,
  ElementProps,
  Font,
  Size,
  SizeList,
  TextAlign,
  TextTransform,
  Weight
} from "../types";

/** @internal */
export interface TextProps extends ElementProps {
  /**
   * Font family
   */
  font?: Font;
  /**
   * Font size
   * "xs", "sm", "md", "lg", "xl"
   */
  size?: Size | string | number;
  /**
   * Font weight
   */
  weight?: Weight;
  /**
   * Background color
   */
  bg?: AllColors;
  /**
   * Text color
   */
  color?: AllColors;
  /**
   * Clip lines
   */
  clip?: number;
  /**
   * Block element
   */
  block?: boolean;
  /**
   * Mark text within
   */
  mark?: string;
  /**
   * Tooltip for text
   */
  tooltip?: string | TooltipProps;

  align?: TextAlign;
  transform?: TextTransform;
}

/**
 * Text block for applying various stylings to textual content
 * @param children
 * @param className
 * @param font
 * @param size
 * @param weight
 * @param bg
 * @param color
 * @param clip
 * @param block
 * @param mark
 * @param tooltip
 * @param align
 * @param transform
 * @param aria-*
 * @constructor
 * @internal
 */
export const AxText: FC<TextProps> = ({
  children,
  className,
  font,
  size,
  weight,
  bg,
  color,
  clip,
  block,
  mark,
  tooltip,
  align,
  transform,
  ...aria
}) => {
  const classes = useMemo(() => {
    const cls = ["ax-text", block ? "ax-block" : "", className ?? ""];
    if (font) {
      cls.push(`ax-font--${font}`);
    }
    if (weight) {
      cls.push(`ax-weight--${weight}`);
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
    if (clip) {
      cls.push("ax-text--clip");
    }
    if (isString(size) && SizeList.includes(size)) {
      cls.push(`ax-font--${size}`);
    }
    return cls.join(" ");
  }, [align, bg, block, className, clip, color, font, size, transform, weight]);

  const styles = useMemo(() => {
    const s: KeyValue = {};
    if (isString(size) && !SizeList.includes(size)) {
      s.fontSize = size;
    }
    if (isNumber(size)) {
      s.fontSize = `${size}rem`;
    }
    if (clip) {
      s["--line-clamp"] = clip;
    }
    return s;
  }, [clip, size]);

  const Wrapper = useMemo(() => (isEmpty(tooltip) ? Fragment : AxTooltip), [tooltip]);

  const tooltipProps = useMemo(() => {
    if (isObject(tooltip)) {
      return tooltip;
    }
    return { content: tooltip };
  }, [tooltip]);

  const inner = useMemo(() => {
    if (isString(children)) {
      if (!isEmpty(tooltip)) {
        return <abbr>{children}</abbr>;
      }
      if (!isEmpty(mark)) {
        const regx = new RegExp(`(${mark})=?`, "i");
        return (
          <span
            dangerouslySetInnerHTML={{
              __html: regx.test(children) ? children.replace(regx, `<mark>$1</mark>`) : children
            }}
          />
        );
      }
    }
    return children;
  }, [children, mark, tooltip]);

  return (
    <Wrapper {...((isEmpty(tooltip) ? {} : tooltipProps) as AnyObject)}>
      <span className={classes} {...aria} style={styles}>
        {inner}
      </span>
    </Wrapper>
  );
};
AxText.displayName = "AxText";
