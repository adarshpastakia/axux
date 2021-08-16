// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useLayoutEffect, useRef, VFC } from "react";
import { useGridContext } from "./GridContext";
import { HeaderCell } from "./HeaderCell";

/**
 * Datagrid header row
 * @constructor
 * @internal
 */
export const GridHeader: VFC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { columns, scrollTo } = useGridContext();
  useLayoutEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translateX(${scrollTo}px)`;
    }
  }, [scrollTo]);
  return (
    <div className="ax-grid__header">
      <div ref={wrapperRef}>
        {columns.map((column, index) => (
          <HeaderCell key={index} {...column} />
        ))}
      </div>
    </div>
  );
};
