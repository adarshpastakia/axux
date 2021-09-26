// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty, isNumber, isString, tokenize } from "@axux/utilities";
import {
  FC,
  forwardRef,
  Fragment,
  useCallback,
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
import { AxAbbr } from "./Abbr";

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
   * Mark text within
   */
  mark?: string | string[];
  /**
   * Tooltip for text
   */
  abbr?: [textPart: string, tooltip: string, color?: string][];

  align?: TextAlign;
  transform?: TextTransform;

  abbrRenderer?: (part: string[]) => JSX.Element;
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
export const AxText: FC<TextProps> = forwardRef<HTMLSpanElement, TextProps>(
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
      mark,
      abbr,
      align,
      transform,
      abbrRenderer,
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
      if (clip) {
        s["--line-clamp"] = clip;
      }
      return s;
    }, [clip, size]);

    useLayoutEffect(() => {
      setShowMore(true);
      if (textRef.current && clip) {
        const el = textRef.current;
        el.style.display = "block";
        el.classList.remove("ax-text--clip");
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

    const abbrRender = useCallback(
      (text: string, tooltip: string, color = "") => {
        if (abbrRenderer) {
          return abbrRenderer([text, tooltip, color]);
        }
        return (
          <AxAbbr tooltip={tooltip} color={color}>
            {text}
          </AxAbbr>
        );
      },
      [abbrRenderer]
    );

    const inner = useMemo(() => {
      if (isString(children)) {
        const tokens = tokenize(children, abbr ? abbr.map(([keyword]) => keyword) : mark);

        if (!isEmpty(abbr)) {
          const titles: KeyValue = abbr.reduce(
            (t, [a, tooltip = "", color = ""]) => ({ ...t, [a.toLowerCase()]: { tooltip, color } }),
            {}
          );
          return (
            <Fragment>
              {tokens.map(([start, text], i) => {
                const { tooltip = "", color = "" } = titles[text.toLowerCase()] ?? {};
                return (
                  <Fragment key={i}>
                    {start ? <span>{start}</span> : null}
                    {text ? abbrRender(text, tooltip, color) : null}
                  </Fragment>
                );
              })}
            </Fragment>
          );
        }
        if (!isEmpty(mark)) {
          return (
            <Fragment>
              {tokens.map(([start, text], i) => (
                <Fragment key={i}>
                  {start ? <span>{start}</span> : null}
                  {text ? <mark>{text}</mark> : null}
                </Fragment>
              ))}
            </Fragment>
          );
        }
      }
      return children;
    }, [children, abbr, mark, abbrRender]);

    return (
      <Fragment>
        <span
          className={`${classes} ${showMore ? "" : "ax-clip"}`}
          {...aria}
          style={styles}
          ref={textRef}
        >
          {inner}
        </span>
        {canClip && (
          <span className="ax-block ax-font--sm ax-align--end">
            <a onClick={() => setShowMore(!showMore)}>
              {t(showMore ? "action.less" : "action.more")}
            </a>
          </span>
        )}
      </Fragment>
    );
  }
);
AxText.displayName = "AxText";
