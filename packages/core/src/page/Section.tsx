// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, forwardRef } from "react";
import { ElementProps, RefProp } from "../types";
import { Aside } from "./Aside";

/** @internal */
export interface HeadFootProps extends ElementProps {
  height?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
}

/**
 * Section header
 * @param children
 * @param className
 * @param height
 * @param minHeight
 * @param maxHeight
 * @param aria
 * @constructor
 * @internal
 */
export const Head: FC<HeadFootProps> = ({
  children,
  className,
  height,
  minHeight,
  maxHeight,
  ...aria
}) => (
  <div
    className={`ax-section__head ${className ?? ""}`}
    style={{ height, minHeight, maxHeight }}
    {...aria}
  >
    {children}
  </div>
);

/**
 * Section footer
 * @param children
 * @param className
 * @param height
 * @param minHeight
 * @param maxHeight
 * @param aria
 * @constructor
 * @internal
 */
export const Foot: FC<HeadFootProps> = ({
  children,
  className,
  height,
  minHeight,
  maxHeight,
  ...aria
}) => (
  <div
    className={`ax-section__foot ${className ?? ""}`}
    style={{ height, minHeight, maxHeight }}
    {...aria}
  >
    {children}
  </div>
);

interface ExtendedFC extends FC<ElementProps & RefProp> {
  Head: typeof Head;
  Foot: typeof Foot;
  Side: typeof Aside;
}

/**
 * Section grid
 * @internal
 */
export const AxSection: ExtendedFC = forwardRef<HTMLDivElement, ElementProps>(
  ({ children, className, ...aria }, ref) => (
    <div ref={ref} className={`ax-section ${className ?? ""}`} {...aria}>
      {children}
    </div>
  )
) as AnyObject;
AxSection.Head = Head;
AxSection.Foot = Foot;
AxSection.Side = Aside;

AxSection.displayName = "AxSection";
AxSection.Head.displayName = "AxSection.Head";
AxSection.Foot.displayName = "AxSection.Foot";
AxSection.Side.displayName = "AxSection.Side";
