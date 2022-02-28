// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { ElementProps, EmptyCallback } from "@axux/core/dist/types";
import { CSSProperties, ReactNode } from "react";

export interface TimelineProps<T = KeyValue> extends ElementProps {
  list: T[];
  isLoading?: boolean;
  canLoadMore?: boolean;
  onLoadMore?: EmptyCallback;
  sortOrder?: "asc" | "desc";
  onSort?: (order: "asc" | "desc") => void;
  onScroll?: (top: number) => void;
  initialScroll?: number;
  children: (props: {
    style: CSSProperties;
    isScrolling: boolean;
    measure: () => void;
    index: number;
    record: T;
  }) => ReactNode;
}
