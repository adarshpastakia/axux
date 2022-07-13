/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isString } from "@axux/utilities";
import { calculateTextHeight } from "@axux/utilities/dist/dom";
import {
  Children,
  FC,
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import ResizeObserver from "resize-observer-polyfill";
import { ChildrenProp, ElementProps } from "../types";
import { Abbr } from "./Abbr";
import { Badge } from "./Badge";
import { Copy } from "./Copy";
import { Ellipsis } from "./Ellipsis";
import { Mark } from "./Mark";

export interface TextProps extends ElementProps, ChildrenProp {
  /**
   * clip
   */
  clip?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Text block with option to clip lines for show less/more
 */
export const AxText: FC<TextProps> & {
  Ellipsis: typeof Ellipsis;
  Badge: typeof Badge;
  Mark: typeof Mark;
  Abbr: typeof Abbr;
  Copy: typeof Copy;
} = ({ children, className, clip, ...rest }) => {
  const { t } = useTranslation("core");
  const refContainer = useRef<HTMLDivElement>(null);
  const [clipped, setClipped] = useState(false);
  const [showMore, setShowMore] = useState(false);

  /******************* reset clip state *******************/
  useEffect(() => {
    setClipped(false);
    setShowMore(false);
  }, [children, clip]);

  /******************* check text height if clip enabled *******************/
  const checkHeight = useCallback(() => {
    const el = refContainer.current as HTMLElement;
    if (el && clip && !showMore) {
      setClipped(
        calculateTextHeight(el.firstElementChild as HTMLElement, el) >
          el.offsetHeight
      );
    }
  }, [clip, showMore]);

  /******************* observe element resize to recalculate height *******************/
  useLayoutEffect(() => {
    const ob = new ResizeObserver(checkHeight);
    ob.observe(refContainer.current as HTMLElement);
    checkHeight();
    return () => {
      ob.disconnect();
    };
  }, [children, checkHeight]);

  /******************* component *******************/
  return (
    <div
      {...rest}
      data-clipped={clipped}
      className={`ax-text ${className ?? ""}`}
    >
      <div ref={refContainer} data-clip={showMore ? "none" : clip ?? "none"}>
        <span>
          {Children.map(children, (child) => (
            <Fragment>
              {isString(child) && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: child.split("\n").join("<br />"),
                  }}
                />
              )}
              {!isString(child) && <span>{child}</span>}
            </Fragment>
          ))}
        </span>
      </div>
      {clipped && (
        <div className="ax-moreLink">
          <a onClick={() => setShowMore(!showMore)}>
            ...{t(`action.${showMore ? "less" : "more"}`)}
          </a>
        </div>
      )}
    </div>
  );
};
AxText.Ellipsis = Ellipsis;
AxText.Badge = Badge;
AxText.Mark = Mark;
AxText.Abbr = Abbr;
AxText.Copy = Copy;

AxText.displayName = "AxText";
AxText.Ellipsis.displayName = "AxText.Ellipsis";
AxText.Badge.displayName = "AxText.Badge";
AxText.Mark.displayName = "AxText.Mark";
AxText.Abbr.displayName = "AxText.Abbr";
AxText.Copy.displayName = "AxText.Copy";
