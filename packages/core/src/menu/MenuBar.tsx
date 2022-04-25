// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { Children, cloneElement, FC, MouseEvent, ReactElement } from "react";
import { Size } from "../types";
import { AxToolbar } from "../appbars/Toolbar";

/** @internal */
export interface MenubarProps {
  size?: Size;
  className?: string;
  onClick?: (menuId: string) => void;
}

/**
 * MenuBar
 * @internal
 */
export const AxMenuBar: FC<MenubarProps> = ({ children, size, items, onClick, className }) => {
  const checkMenuClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (onClick && target.dataset.id) {
      onClick(target.dataset.id);
    }
  };
  return (
    <AxToolbar
      className={`ax-menu__bar ${className ?? ""}`}
      data-size={size}
      onClick={checkMenuClick}
    >
      {Children.map(children, (child) =>
        cloneElement(child as ReactElement, { placement: "bottom" })
      )}
    </AxToolbar>
  );
};
