/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { HotKeyWrapper } from "../hotkeys/HotKeyWrapper";
import { type ChildrenProp, type ElementProps } from "../types";
import { AxErrorBoundary } from "./ErrorBoundary";

export interface ViewportProps
  extends Omit<ElementProps, "className">,
    ChildrenProp {
  /**
   * Resize handler
   *
   * @param { width, height }
   */
  onResize?: (rect: { width: number; height: number }) => void;
}

/**
 * The Viewport component serves as a versatile application viewport designed to offer a grid-based layout system
 * while functioning as a container for overlay portals.
 */
export const AxViewport: FC<ViewportProps> = ({
  children,
  onResize,
  ...rest
}) => {
  const resizeHandle = useResizeObserver(onResize);
  /** ***************** component *******************/
  return (
    <HotKeyWrapper>
      <div {...rest} ref={resizeHandle} className="ax-viewport">
        <AxErrorBoundary>{children}</AxErrorBoundary>
      </div>
    </HotKeyWrapper>
  );
};
