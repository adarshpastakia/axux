/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC, type UIEventHandler } from "react";
import { AxErrorBoundary } from "../application/ErrorBoundary";
import { useResizeObserver } from "../hooks/useResizeObserver";
import {
  type ChildrenProp,
  type ElementProps,
  type Gutter,
  type RefProp,
} from "../types";
import { EmptyContent } from "./EmptyContent";

export type Props = ElementProps &
  ChildrenProp &
  RefProp<HTMLDivElement> & {
    /**
     * padding
     */
    padding?: Gutter;
    /**
     * scroll handler
     */
    onScroll?: UIEventHandler;
    /**
     * Resize handler
     *
     * @param { width, height }
     */
    onResize?: (rect: { width: number; height: number }) => void;
  };
/**
 * A simple scrollable content area with padding
 */
export const ContentRoot: FC<Props> = (({
  className,
  padding,
  onResize,
  children,
  ...rest
}: Props) => {
  const resizeHandle = useResizeObserver(onResize);
  return (
    <div
      {...rest}
      ref={resizeHandle}
      data-padding={padding}
      className={`ax-content ${className ?? ""}`}
    >
      <AxErrorBoundary>{children}</AxErrorBoundary>
    </div>
  );
}) as AnyObject;

export const AxContent = Object.assign(ContentRoot, {
  Empty: EmptyContent,
});

AxContent.displayName = "AxContent";
AxContent.Empty.displayName = "AxContent.Empty";
