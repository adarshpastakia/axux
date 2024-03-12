/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { type ChildrenProp, type ElementProps } from "../types";

/**
 * header panel
 */
export const AxHeader: FC<ElementProps & ChildrenProp> = ({
  className,
  children,
  ...props
}) => {
  const {
    isExpanded,
    isCollapsed,
    onBack,
    onCollapse,
    onExpand,
    onClose,
    onClick,
    ...rest
  } = props as AnyObject;
  return (
    <div {...rest} className={`ax-header ${className ?? ""}`}>
      {children}
    </div>
  );
};
