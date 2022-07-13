/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

export interface PaginationOptions {
  totalRecords: number;
  currentPage?: number;
  perPage?: number;
  onChange?: (page: number) => void;
}

const TOTAL_PILLS = 9;
const TOTAL_SIBLINGS = 2;

const makeRange = (start: number, end: number) => {
  const length = end - start;
  return Array.from({ length }, (_: AnyObject, idx: number) => idx + start);
};

export const usePagination = ({
  totalRecords,
  currentPage = 0,
  perPage = 25,
  onChange,
}: PaginationOptions) => {
  const [page, setPage] = useState(0);
  const [pending, startTransition] = useTransition();

  /******************* calculate total pages *******************/
  const totalPages = useMemo(
    () => Math.ceil(totalRecords / perPage),
    [totalRecords, perPage]
  );

  /******************* calculate ranges *******************/
  const ranges = useMemo(() => {
    if (totalPages <= TOTAL_PILLS) {
      return [makeRange(0, totalPages)];
    }

    const leftSiblingIndex = Math.max(page - TOTAL_SIBLINGS, 0);
    const rightSiblingIndex = Math.min(page + TOTAL_SIBLINGS, totalPages - 1);
    const shouldShowLeftDots = leftSiblingIndex >= TOTAL_SIBLINGS;
    const shouldShowRightDots = rightSiblingIndex < totalPages - TOTAL_SIBLINGS;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      return [
        makeRange(0, TOTAL_SIBLINGS * 3),
        makeRange(totalPages - TOTAL_SIBLINGS, totalPages),
      ];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      return [
        makeRange(0, TOTAL_SIBLINGS),
        makeRange(totalPages - TOTAL_SIBLINGS * 3, totalPages),
      ];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      return [
        makeRange(0, TOTAL_SIBLINGS),
        makeRange(leftSiblingIndex + 1, rightSiblingIndex),
        makeRange(totalPages - TOTAL_SIBLINGS, totalPages),
      ];
    }

    return [];
  }, [page, totalPages]);

  /******************* set page *******************/
  useEffect(() => {
    setPage(Math.min(currentPage, totalPages - 1));
  }, [currentPage, totalPages]);

  const headLabel = useMemo(
    () => (
      <span className="text-muted">
        {page * perPage + 1} -{" "}
        {Math.min(page * perPage + perPage, totalRecords)}
      </span>
    ),
    [page, perPage, totalRecords]
  );

  const onPageChange = useCallback((page: number) => {
    setPage(page);
    startTransition(() => onChange?.(page));
  }, []);

  return { page, totalPages, headLabel, ranges, onPageChange };
};
