// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Color, ColorPalette, EmptyCallback } from "@axux/core/dist/types";
import { ReactNodeArray } from "react";

export interface TimelineRecord {
  type?: "event" | "comment";
  timestamp: Date;
  username: string | JSX.Element;
  event: string | JSX.Element;
  icon?: string | JSX.Element;
  iconBg?: Color | ColorPalette;
  iconColor?: Color | ColorPalette;
  actions?: ReactNodeArray;
}

export interface TimelineProps {
  isLoading?: boolean;
  canLoadMore?: boolean;
  onLoadMore?: EmptyCallback;
}
