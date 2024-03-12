/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { AxButton } from "../buttons/Button";
import { type ChildrenProp, type ElementProps } from "../types";
import { AppIcons } from "../types/appIcons";
import { handleClick } from "@axux/utilities/src/handlers";

/**
 * Header for essential navigation and branding elements
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
    <div
      {...rest}
      role="none"
      onClick={handleClick(onClick)}
      className={`ax-header ${className ?? ""}`}
    >
      {onBack && (
        <AxButton
          rtlFlip
          variant="link"
          className="toggle-back"
          aria-label="back"
          data-tool="true"
          stopPropagation
          icon={AppIcons.iconCaretLeft}
          onClick={onBack}
        />
      )}
      {children}
      {onExpand && (
        <AxButton
          rtlFlip
          data-tool="true"
          variant="link"
          className="toggle-expand"
          aria-label="toggle expand"
          stopPropagation
          icon={isExpanded ? AppIcons.iconCollapse : AppIcons.iconExpand}
          onClick={onExpand}
        />
      )}
      {!isExpanded && onCollapse && (
        <AxButton
          rtlFlip
          data-tool="true"
          variant="link"
          className="toggle-collapse"
          aria-label="toggle collapse"
          stopPropagation
          icon={
            isCollapsed ? AppIcons.iconExpandPlus : AppIcons.iconCollapseMinus
          }
          onClick={onCollapse}
        />
      )}
      {onClose && (
        <AxButton
          rtlFlip
          data-tool="true"
          variant="link"
          className="toggle-close"
          aria-label="close"
          stopPropagation
          icon={AppIcons.iconClose}
          onClick={onClose}
        />
      )}
    </div>
  );
};
