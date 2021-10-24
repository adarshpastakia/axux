// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty, isString, tokenize } from "@axux/utilities";
import { FC, forwardRef, Fragment, useImperativeHandle, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ElementProps } from "../types";

/** @internal */
export interface MarkedProps extends ElementProps {
  /**
   * Mark text within
   */
  mark: string | string[];
}

/**
 * Text block for applying various stylings to textual content
 * @param children
 * @param className
 * @param mark
 * @param aria-*
 * @constructor
 * @internal
 */
export const MarkedText: FC<MarkedProps> = forwardRef<HTMLSpanElement, MarkedProps>(
  ({ children, className, mark, ...aria }, ref) => {
    const textRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => textRef.current as HTMLSpanElement);

    const inner = useMemo(() => {
      if (isString(children)) {
        if (!isEmpty(mark)) {
          const tokens = tokenize(children, mark);
          return (
            <Fragment>
              {tokens.map(([start, text], i) => (
                <Fragment key={i}>
                  {start ? <span>{start}</span> : null}
                  {text ? <mark className="ax-mark">{text}</mark> : null}
                </Fragment>
              ))}
            </Fragment>
          );
        }
      }
      return children;
    }, [children, mark]);

    return (
      <Fragment>
        <span className={`ax-text ${className ?? ""}`} {...aria} ref={textRef}>
          {inner}
        </span>
      </Fragment>
    );
  }
);
