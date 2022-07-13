/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC, useMemo } from "react";
import { useBadge } from "../hooks/useBadge";
import { AxIcon } from "../icons/Icon";
import { AxPopover } from "../overlays/Popover";
import { BadgeType, EmptyCallback } from "../types";
import { Link } from "./Link";

interface BreadcrumbItem {
  to?: string;
  icon?: string;
  rtlFlip?: boolean;
  label: string;
  badge?: BadgeType;
  onClick?: EmptyCallback;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  theme?: "classic" | "modern";
}

const Crumb = (
  { to, icon, label, badge, onClick, rtlFlip }: BreadcrumbItem,
  index: number = 0
) => (
  <div className="ax-breadcrumb__item" key={index}>
    <Link to={to} onClick={onClick}>
      {icon && <AxIcon icon={icon} rtlFlip={rtlFlip} />}
      <label>{label}</label>
      {badge && useBadge(badge)}
    </Link>
  </div>
);

export const AxBreadcrumb: FC<BreadcrumbProps> = ({ items, theme }) => {
  const [start, rest, end] = useMemo(
    () =>
      items.length > 9
        ? [items.slice(0, 3), items.slice(3, -3), items.slice(-3)]
        : [items, [], []],
    [items]
  );

  if (items.length === 0) return null;

  return (
    <div className="ax-breadcrumb" data-theme={theme}>
      {start.map(Crumb)}
      {rest.length > 0 && (
        <AxPopover>
          <div className="ax-breadcrumb__item">
            <span>...</span>
          </div>
          <div className="ax-breadcrumb__dropdown">
            {rest.map((props, index) => (
              <AxPopover.Dismiss key={index}>
                {Crumb(props, index)}
              </AxPopover.Dismiss>
            ))}
          </div>
        </AxPopover>
      )}
      {end.map(Crumb)}
    </div>
  );
};
