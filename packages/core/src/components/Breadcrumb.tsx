/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { useMemo, type FC } from "react";
import { useBadge } from "../hooks/useBadge";
import { AxIcon } from "../icons/Icon";
import { AxPopover } from "../overlays/Popover";
import { type BadgeType, type IconProp, type MouseProps } from "../types";
import { Link } from "./Link";

export interface BreadcrumbItem extends IconProp, MouseProps {
  /**
   * react router nav to
   */
  to?: string;
  /**
   * item label
   */
  label: string;
  /**
   * item badge
   */
  badge?: BadgeType;
}

export interface BreadcrumbProps {
  /**
   * breadcrumb items
   */
  items: BreadcrumbItem[];
  /**
   * breadcrumb theme
   */
  theme?: "classic" | "modern";
  /**
   * theme color
   */
  color?: "primary" | "accent";
}

const Crumb = (
  { to, icon, label, badge, onClick, rtlFlip }: BreadcrumbItem,
  index: number = 0,
) => (
  <div className="ax-breadcrumb__item" key={index}>
    <Link nav={{ to }} onClick={onClick} as="a">
      {icon && <AxIcon icon={icon} rtlFlip={rtlFlip} />}
      <label>{label}</label>
      {badge && useBadge(badge)}
    </Link>
  </div>
);

export const AxBreadcrumb: FC<BreadcrumbProps> = ({
  items,
  theme,
  color = "primary",
}) => {
  const [start, rest, end] = useMemo(
    () =>
      items.length > 9
        ? [items.slice(0, 3), items.slice(3, -3), items.slice(-3)]
        : [items, [], []],
    [items],
  );

  if (items.length === 0) return null;

  return (
    <div className="ax-breadcrumb" data-theme={theme} data-color={color}>
      {start.map(Crumb)}
      {rest.length > 0 && (
        <AxPopover showArrow placement="bottom">
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
