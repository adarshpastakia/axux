/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { handleClick } from "@axux/utilities/dist/handlers";
import { FC } from "react";
import { AxButton } from "../buttons/Button";
import { ChildrenProp, ElementProps } from "../types";
import { AppIcons } from "../types/appIcons";

/**
 * header panel
 */
export const AxHeader: FC<ElementProps & Partial<ChildrenProp>> = ({
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
      className={`ax-header ${className ?? ""}`}
      onClick={handleClick(onClick)}
    >
      {onBack && (
        <AxButton
          rtlFlip
          type="link"
          className="toggle-back"
          aria-label="back"
          stopPropagation
          icon={AppIcons.iconCaretLeft}
          onClick={onBack}
        />
      )}
      {children}
      {onExpand && (
        <AxButton
          rtlFlip
          type="link"
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
          type="link"
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
          type="link"
          className="toggle-close"
          aria-label="close"
          stopPropagation
          icon={AppIcons.iconClose}
          onClick={handleClick(onClose)}
        />
      )}
    </div>
  );
};
