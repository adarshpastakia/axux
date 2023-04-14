/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type FC, useEffect } from "react";
import { useTooltipWatcher } from "../hooks/useTooltip";
import { HotKeyWrapper } from "../hotkeys/HotKeyWrapper";
import { type ChildrenProp, type ElementProps } from "../types";
import { AxErrorBoundary } from "./ErrorBoundary";

export interface ViewportProps extends ElementProps, ChildrenProp {
  //
}

export const AxViewport: FC<ViewportProps> = ({
  children,
  className,
  ...rest
}) => {
  const dispose = useTooltipWatcher();
  useEffect(() => {
    return () => {
      dispose();
    };
  }, []);
  /** ***************** component *******************/
  return (
    <HotKeyWrapper>
      <div {...rest} className={`ax-viewport ${className ?? ""}`}>
        <AxErrorBoundary>{children}</AxErrorBoundary>
      </div>
    </HotKeyWrapper>
  );
};
