/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { handleClick } from "@axux/utilities/dist/handlers";
import { type FC } from "react";
import { AxButton } from "../buttons/Button";
import { type ChildrenProp, type ElementProps } from "../types";
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
      <AxButton.Group data-tool="true" variant="plain">
        {onExpand && (
          <AxButton
            rtlFlip
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
            variant="link"
            className="toggle-close"
            aria-label="close"
            stopPropagation
            icon={AppIcons.iconClose}
            onClick={onClose}
          />
        )}
      </AxButton.Group>
    </div>
  );
};
