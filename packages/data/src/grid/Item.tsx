// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { ElementProps } from "@axux/core/dist/types";
import { CSSProperties, FC, memo, useEffect, useState } from "react";

export interface CellProps extends ElementProps {
  index?: number;
  style?: CSSProperties;
  isScrolling?: boolean;
  measure: () => void;
}

export const GridItem: FC<CellProps> = memo(
  ({ className, style, isScrolling, measure, children, index }) => {
    const [eventRef, setEventRef] = useState<HTMLElement | null>(null);

    useEffect(() => {
      if (ResizeObserver && !isScrolling) {
        if (eventRef) {
          const el = eventRef;
          const ob = new ResizeObserver(() => {
            const { offsetWidth: width, offsetHeight: height } = el;
            console.log("======>", index, { width, height });
            measure && measure();
          });
          ob.observe(el);
          return () => ob.disconnect();
        }
      }
    }, [eventRef, isScrolling, measure, index]);

    return (
      <div style={style} className="ant-grid__cell">
        <section ref={setEventRef} className={className}>
          {children}
        </section>
      </div>
    );
  }
);
