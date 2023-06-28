/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useLayoutEffect, useRef, useState, type FC } from "react";
import { type ElementProps } from "../types";

export interface EllipsisProps extends ElementProps {
  children: string;
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

  /** ***************** check text width *******************/
  const checkWidth = useRef(() => {
    const el = refContainer.current as HTMLElement;
    const child = el.firstElementChild as HTMLElement;
    if (el && child) {
      el.dataset.break = "false";
      setApplyEllipsis(
        (el.dataset.break =
          child.offsetWidth > el.offsetWidth ? "true" : "false") === "true"
      );
    }
  });

  /** ***************** observe element resize to recalculate width *******************/
  useLayoutEffect(() => {
    const ob = new ResizeObserver(checkWidth.current);
    ob.observe(refContainer.current as HTMLElement);
    return () => {
      ob.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    setApplyEllipsis(false);
    checkWidth.current();
  }, [children]);

  /** ***************** component *******************/
  return (
    <div
      {...rest}
      ref={refContainer}
      data-tooltip={
        applyEllipsis
          ? (refContainer.current?.firstElementChild as HTMLElement)?.innerHTML
          : ""
      }
      className={`ax-text ax-ellipsis ${className ?? ""}`}
      style={{ width, minWidth, maxWidth }}
    >
      <span>{children}</span>
      <span>
        <span>{children}</span>
      </span>
    </div>
  );
};
