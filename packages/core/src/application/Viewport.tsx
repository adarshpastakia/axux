/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";
import { HotKeyWrapper } from "../hotkeys/HotKeyWrapper";
import { ChildrenProp, ElementProps } from "../types";
import { AxErrorBoundary } from "./ErrorBoundary";

export interface ViewportProps extends ElementProps, ChildrenProp {
  //
}

export const AxViewport: FC<ViewportProps> = ({
  children,
  className,
  ...rest
}) => {
  /******************* component *******************/
  return (
    <HotKeyWrapper>
      <div {...rest} className={`ax-viewport ${className ?? ""}`}>
        <AxErrorBoundary>{children}</AxErrorBoundary>
      </div>
    </HotKeyWrapper>
  );
};
