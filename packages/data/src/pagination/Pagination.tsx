/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { type FC, Fragment, useMemo } from "react";

export interface PaginationProps {
  page: number;
  totalPages: number;
  ranges: number[][];
  isMinimal?: boolean;
  onPageChange: (page: number) => void;
}

export const AxPagination: FC<PaginationProps> = ({
  page,
  ranges,
  totalPages,
  isMinimal,
  onPageChange,
}) => {
  const [start, mid, last] = ranges;

  const pageBody = useMemo(
    () => (
      <Fragment>
        {start?.map((pg) => (
          <button
            key={pg}
            data-active={page === pg}
            onClick={() => onPageChange(pg)}
          >
            {pg + 1}
          </button>
        ))}
        {mid && <span>...</span>}
        {mid?.map((pg) => (
          <button
            key={pg}
            data-active={page === pg}
            onClick={() => onPageChange(pg)}
          >
            {pg + 1}
          </button>
        ))}
        {last && <span>...</span>}
        {last?.map((pg) => (
          <button
            key={pg}
            data-active={page === pg}
            onClick={() => onPageChange(pg)}
          >
            {pg + 1}
          </button>
        ))}
      </Fragment>
    ),
    [start, mid, last, page]
  );

  return (
    <div className="ax-pagination">
      <button onClick={() => onPageChange(0)} data-disabled={page === 0}>
        <AxIcon icon={AppIcons.iconChevronLeft} rtlFlip />
      </button>
      <button onClick={() => onPageChange(page - 1)} data-disabled={page === 0}>
        <AxIcon icon={AppIcons.iconCaretLeft} rtlFlip />
      </button>
      {!isMinimal && pageBody}
      {isMinimal && (
        <label>
          {page + 1}/{totalPages}
        </label>
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        data-disabled={page + 1 >= totalPages}
      >
        <AxIcon icon={AppIcons.iconCaretRight} rtlFlip />
      </button>
      <button
        onClick={() => onPageChange(totalPages - 1)}
        data-disabled={page + 1 >= totalPages}
      >
        <AxIcon icon={AppIcons.iconChevronRight} rtlFlip />
      </button>
    </div>
  );
};
