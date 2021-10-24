// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Color, ColorPalette, ElementProps, EmptyCallback } from "@axux/core/dist/types";
import { CSSProperties, ReactNode, ReactNodeArray } from "react";
import { HeaderProps } from "@axux/core/dist/appbars/Header";

export interface TimelineRecord {
  type?: "event" | "comment";
  timestamp: Date;
  username: string | JSX.Element;
  event: string | JSX.Element;
  className?: string;
  image?: string;
  icon?: string | JSX.Element;
  iconBg?: Color | ColorPalette;
  iconColor?: Color | ColorPalette;
  actions?: ReactNodeArray;
  sidebar?: JSX.Element;
  footer?: JSX.Element;
  headerProps?: Omit<HeaderProps, "title" | "onClick" | "onBack">;
  headerAppend?: JSX.Element;
  reverse?: boolean;
  noline?: boolean;
  isCollapsed?: boolean;
  isCollapsable?: boolean;
}

export interface TimelineProps extends ElementProps {
  list: TimelineRecord[];
  isLoading?: boolean;
  canLoadMore?: boolean;
  onLoadMore?: EmptyCallback;
  sortOrder?: "asc" | "desc";
  onSort?: (order: "asc" | "desc") => void;
  children: (props: {
    style: CSSProperties;
    isScrolling: boolean;
    measure: () => void;
    index: number;
    record: TimelineRecord;
  }) => ReactNode;
}
