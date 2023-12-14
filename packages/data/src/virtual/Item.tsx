/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { type ChildrenProp } from "@axux/core/dist/types";
import { memo, useLayoutEffect, useRef } from "react";
import { areEqual } from "react-window";

export interface VirtualItemProps extends ChildrenProp {
  index: number;
  isLast: boolean;
  isSticky?: boolean;
  updateSize: (index: number, width: number, height: number) => void;
}

/** ***************** Timeline item *******************/
// eslint-disable-next-line react/display-name
export const AxVirtualItem = memo(
  ({
    index,
    children,
    isLast,
    updateSize,
    isSticky,
    ...rest
  }: VirtualItemProps) => {
    const itemRef = useRef<HTMLDivElement>(null);

    /** ***************** calculate height on resize *******************/
    useLayoutEffect(() => {
      const child = itemRef.current?.firstElementChild as HTMLElement;
      if (child) {
        const ob = new ResizeObserver(() => {
          if (child != null) {
            updateSize(index, child.offsetWidth, child.offsetHeight);
          }
        });
        ob.observe(child);
        return () => {
          ob.unobserve(child);
          ob.disconnect();
        };
      }
    }, []);

    /** ***************** component *******************/
    return (
      <div
        {...rest}
        ref={itemRef}
        data-index={index}
        data-sticky={isSticky}
        data-last-child={isLast}
        className="ax-virtual__item"
      >
        {children}
      </div>
    );
  },
  areEqual
);
AxVirtualItem.displayName = "AxVirtualItem";
