// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useCallback, useReducer } from "react";

interface Return<T> {
  records: T[];
  totalCount: number;
}

interface PaginationOptions<T> {
  perPage: number;
  defaultPage?: number;
  records?: T[];

  onLoadPage?: (page: number) => Return<T> | Promise<Return<T>>;
}

interface State<T> {
  page: number;
  totalPages: number;

  pageStart: number;
  pageEnd: number;
  totalCount: number;
  records: T[];
  pageRecords: T[];
}

type Action<T> = (State<T> & { type: "loadRecords" }) | { type: "resetState" };

export const useAxPagination = <T extends KeyValue>({ perPage = 20 }: PaginationOptions<T>) => {
  const reducer = useCallback((state: State<T>, { type, ...rest }: Action<T>) => {
    switch (type) {
      case "loadRecords":
        return {
          ...state,
          ...rest
        };
      case "resetState":
        return {
          page: 0,
          totalPages: 0,
          pageStart: 0,
          pageEnd: 0,
          totalCount: 0,
          pageRecords: [],
          records: []
        };
      default:
        throw new Error();
    }
  }, []);

  const [{ page, totalPages, pageStart, pageEnd, totalCount, records, pageRecords }, dispatch] =
    useReducer(reducer, {
      page: 0,
      totalPages: 0,
      pageStart: 0,
      pageEnd: 0,
      totalCount: 0,
      records: [],
      pageRecords: []
    });

  const loadPageRecords = useCallback(
    (page: number, records: T[]) => {
      const start = records.length > 0 ? (page - 1) * perPage : 0;
      const totalPages = Math.ceil(records.length / perPage);
      const pageRecords = records.slice(start, start + perPage);
      dispatch({
        type: "loadRecords",
        page,
        records,
        pageRecords,
        pageStart: start + 1,
        pageEnd: start + records.length,
        totalPages: totalPages || 1,
        totalCount: records.length
      });
    },
    [perPage]
  );

  const onPageChange = useCallback(
    (page: number) => {
      loadPageRecords(page, records);
    },
    [loadPageRecords, records]
  );

  const setRecords = useCallback(
    (records: T[] = [], defaultPage = 1) => {
      loadPageRecords(defaultPage, records);
    },
    [loadPageRecords]
  );

  return {
    page,
    totalPages,
    pageStart,
    pageEnd,
    totalCount,
    pageRecords,
    onPageChange,
    setRecords
  };
};
