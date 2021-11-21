// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isColor, isNumber, isString } from "@axux/utilities";
import {
  FC,
  forwardRef,
  Fragment,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useTranslation } from "react-i18next";
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
import { AbbrText } from "./Abbr";
import { MarkedText } from "./Marked";

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
   * Word break
   */
  wordBreak?: boolean;
  /**
   * No wrap
   */
  noWrap?: boolean;
  /**
   * Clip single line with ellipsis
   */
  ellipsis?: boolean;

  align?: TextAlign;
  transform?: TextTransform;
}

interface Extended extends FC<TextProps> {
  Abbr: typeof AbbrText;
  Marked: typeof MarkedText;
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
export const AxText: Extended = forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      children,
      className,
      font,
      size,
      weight,
      bg,
      color,
      clip,
      block,
      align,
      transform,
      ellipsis,
      noWrap,
      wordBreak,
      ...aria
    },
    ref
  ) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const [canClip, setCanClip] = useState(false);
    const [showMore, setShowMore] = useState(true);

    const { t } = useTranslation("core");
    useImperativeHandle(ref, () => textRef.current as HTMLSpanElement);

    const classes = useMemo(() => {
      const cls = ["ax-text", block || clip ? "ax-block" : "", className ?? ""];
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
      if (clip) {
        cls.push(`ax-align--justify`);
      } else if (align) {
        cls.push(`ax-align--${align}`);
      }
      if (transform) {
        cls.push(`ax-text--${transform}`);
      }
      if (isString(size) && SizeList.includes(size)) {
        cls.push(`ax-font--${size}`);
      }
      if (wordBreak) {
        cls.push("ax-text--break");
      } else if (noWrap) {
        cls.push("ax-text--nowrap");
      } else if (ellipsis) {
        cls.push("ax-ellipsis");
      }
      return cls.join(" ");
    }, [
      align,
      bg,
      block,
      className,
      clip,
      color,
      font,
      ellipsis,
      noWrap,
      size,
      transform,
      weight,
      wordBreak
    ]);

    const styles = useMemo(() => {
      const s: KeyValue = {};
      if (isString(size) && !SizeList.includes(size)) {
        s.fontSize = size;
      }
      if (isNumber(size)) {
        s.fontSize = `${size}rem`;
      }
      if (color && isColor(color)) {
        s.color = color;
      }
      if (clip) {
        s["--line-clamp"] = clip;
      }
      return s;
    }, [clip, color, size]);

    useLayoutEffect(() => {
      setShowMore(true);
      if (textRef.current && clip) {
        const el = textRef.current;
        el.style.display = "block";
        el.classList.remove("ax-clip");
        const timer = setTimeout(() => {
          const lh = parseInt(getComputedStyle(el).lineHeight);
          setCanClip(el.offsetHeight > clip * lh);
          setShowMore(false);
          el.style.display = "";
        }, 1);
        return () => clearTimeout(timer);
      }
      setCanClip(false);
    }, [clip, children]);

    return (
      <Fragment>
        <span
          className={`${classes} ${showMore ? "" : "ax-clip"}`}
          {...aria}
          style={styles}
          ref={textRef}
        >
          {isString(children) && children.split("\n").map((t, i) => <p key={i}>{t}</p>)}
          {!isString(children) && children}
        </span>
        {canClip && (
          <span className="ax-block ax-align--end">
            <a className="ax-font--sm ax-link" onClick={() => setShowMore(!showMore)}>
              {t(showMore ? "action.less" : "action.more")}
            </a>
          </span>
        )}
      </Fragment>
    );
  }
) as AnyObject;
AxText.Abbr = AbbrText;
AxText.Marked = MarkedText;

AxText.displayName = "AxText";
AxText.Abbr.displayName = "AxText.Abbr";
AxText.Marked.displayName = "AxText.Marked";
