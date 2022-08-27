/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { calculateTextWidth } from "@axux/utilities/dist/dom";
import { FC, useLayoutEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { ChildrenProp, ElementProps } from "../types";

export interface EllipsisProps extends ElementProps, ChildrenProp {
  /**
   * width
   */
  width?: string | number;
  /**
   * min width
   */
  minWidth?: string | number;
  /**
   * max width
   */
  maxWidth?: string | number;
}

/**
 * Text block to display ellispsis in middle of the text line
 */
export const Ellipsis: FC<EllipsisProps> = ({
  children,
  className,
  width,
  minWidth,
  maxWidth,
  ...rest
}) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [applyEllipsis, setApplyEllipsis] = useState(false);

  /******************* check text width *******************/
  const checkWidth = useRef(() => {
    const el = refContainer.current as HTMLElement;
    if (el) {
      setApplyEllipsis(
        calculateTextWidth(el.firstElementChild as HTMLElement, el) >
          el.offsetWidth
      );
    }
  });

  /******************* observe element resize to recalculate width *******************/
  useLayoutEffect(() => {
    const ob = new ResizeObserver(checkWidth.current);
    ob.observe(refContainer.current as HTMLElement);
    checkWidth.current();
    return () => {
      ob.disconnect();
    };
  }, [children]);

  /******************* component *******************/
  return (
    <div
      {...rest}
      ref={refContainer}
      data-break={applyEllipsis}
      title={
        applyEllipsis
          ? (refContainer.current?.firstElementChild as HTMLElement)?.innerText
          : ""
      }
      className={`ax-text ax-ellipsis ${className ?? ""}`}
      style={{ width, minWidth, maxWidth }}
    >
      <div>{children}</div>
    </div>
  );
};
