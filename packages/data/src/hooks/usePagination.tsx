// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useCallback, useEffect, useReducer } from "react";

interface Return<T> {
  records: T[];
  totalCount: number;
}

interface PaginationOptions<T> {
  perPage: number;

  records?: T[];

  onLoadPage?: (page: number) => Return<T> | Promise<Return<T>>;
}

interface State<T> {
  page: number;
  totalPages: number;

  pageStart: number;
  pageEnd: number;
  totalCount: number;

  pageRecords: T[];
}

type Action<T> = (State<T> & { type: "loadRecords" }) | { type: "resetState"; state: State<T> };

export const useAxPagination = <T extends KeyValue>({
  perPage = 20,
  records = [],
  onLoadPage
}: PaginationOptions<T>) => {
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
          pageRecords: []
        };
      default:
        throw new Error();
    }
  }, []);

  const [{ page, totalPages, pageStart, pageEnd, totalCount, pageRecords }, dispatch] = useReducer(
    reducer,
    {
      page: 0,
      totalPages: 0,
      pageStart: 0,
      pageEnd: 0,
      totalCount: 0,
      pageRecords: []
    }
  );

  const loadRecords = useCallback(
    (page: number, records: T[], total: number) => {
      const start = total > 0 ? (page - 1) * perPage : 0;
      const totalPages = Math.ceil(total / perPage);
      dispatch({
        type: "loadRecords",
        pageRecords: records,
        pageStart: start + 1,
        pageEnd: start + records.length,
        page,
        totalPages: totalPages || 1,
        totalCount: total
      });
    },
    [perPage]
  );

  const onPageChange = useCallback(
    (page: number) => {
      if (onLoadPage) {
        const ret = onLoadPage(page - 1);
        if (ret instanceof Promise) {
          ret.then((resp) => {
            loadRecords(page, resp.records, resp.totalCount);
          });
        } else {
          loadRecords(page, ret.records, ret.totalCount);
        }
      } else if (records) {
        const start = (page - 1) * perPage;
        const ret = records.slice(start, start + perPage);
        loadRecords(page, ret, records.length);
      }
    },
    [loadRecords, onLoadPage, perPage, records]
  );

  useEffect(() => {
    dispatch({
      type: "resetState",
      state: {
        page: 0,
        totalPages: 0,
        pageStart: 0,
        pageEnd: 0,
        totalCount: 0,
        pageRecords: []
      }
    });
    onPageChange(1);
  }, [onPageChange]);

  return { page, totalPages, pageStart, pageEnd, totalCount, pageRecords, onPageChange };
};
