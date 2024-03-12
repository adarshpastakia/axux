/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { isNumber, isString } from "@axux/utilities";
import { calculateTextHeight } from "@axux/utilities/src/dom";
import { handleClick, handleEnter } from "@axux/utilities/src/handlers";
import {
  Children,
  Fragment,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type FC,
} from "react";
import { useTranslation } from "react-i18next";
import ResizeObserver from "resize-observer-polyfill";
import { usePropToggle } from "../hooks/usePropToggle";
import { type ChildrenProp, type ElementProps } from "../types";
import { Abbr } from "./Abbr";
import { Badge } from "./Badge";
import { Copy } from "./Copy";
import { Mark } from "./Mark";

export interface TextProps extends ElementProps, ChildrenProp {
  /**
   * clip
   */
  clip?: true | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Text block with option to clip lines for show less/more
 */
export const TextComponent: FC<TextProps> = ({
  children,
  className,
  clip,
  ...rest
}: TextProps) => {
  const { t } = useTranslation("core");
  const refContainer = useRef<HTMLDivElement>(null);
  const [clipped, setClipped] = useState(false);
  const [showMore, toggleShowMore] = usePropToggle(false);

  /** ***************** check text height if clip enabled *******************/
  const checkHeight = useCallback(() => {
    const el = refContainer.current as HTMLElement;
    if (el && isNumber(clip) && clip > 0 && !showMore) {
      setClipped(
        calculateTextHeight(el.firstElementChild as HTMLElement, el) >
          el.offsetHeight,
      );
    }
  }, [clip, showMore]);

  /** ***************** observe element resize to recalculate height *******************/
  useLayoutEffect(() => {
    const ob = new ResizeObserver(checkHeight);
    ob.observe(refContainer.current as HTMLElement);
    checkHeight();
    return () => {
      ob.disconnect();
    };
  }, [children, checkHeight]);

  /** ***************** component *******************/
  return (
    <div>
      <div
        {...rest}
        ref={refContainer}
        className={`ax-text ${className ?? ""}`}
        data-clip={showMore ? "none" : clip ?? "none"}
      >
        <div>
          {Children.map(children, (child) => (
            <Fragment>
              {isString(child) && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: child.split("\n").join("<br />"),
                  }}
                />
              )}
              {!isString(child) && <>{child}</>}
            </Fragment>
          ))}
        </div>
      </div>
      {clipped && (
        <div className="ax-moreLink">
          <span
            role="link"
            tabIndex={0}
            className="link"
            onClick={handleClick(toggleShowMore, {
              stopPropagation: true,
            })}
            onKeyDown={handleEnter(toggleShowMore)}
          >
            ...{t(`action.${showMore ? "less" : "more"}`)}
          </span>
        </div>
      )}
    </div>
  );
};

export const AxText = Object.assign(TextComponent, {
  Badge,
  Mark,
  Abbr,
  Copy,
});

AxText.displayName = "AxText";
AxText.Badge.displayName = "AxText.Badge";
AxText.Mark.displayName = "AxText.Mark";
AxText.Abbr.displayName = "AxText.Abbr";
AxText.Copy.displayName = "AxText.Copy";
