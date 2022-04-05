// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { AxIcon } from "../icons/Icon";
import { AxBox } from "../layout/Box";
import { AxPopover } from "../overlays/Popover";
import { EmptyCallback, IconProps } from "../types";

interface Breadcrumb extends IconProps {
  to?: string;
  onClick?: EmptyCallback;
  label?: string | JSX.Element;
}

export interface Props {
  items: Breadcrumb[];
  actions?: JSX.Element[];
  theme?: "classic" | "modern";
}

const LinkItem = ({
  i = 0,
  to = "",
  className = "ax-breadcrumb__item",
  index = 0,
  icon,
  label,
  onClick
}: AnyObject) =>
  to ? (
    <NavLink key={i} to={to} className={className} data-index={index} onClick={onClick}>
      <div title={label}>
        {icon && <AxIcon icon={icon} size="md" />}
        {label && <span>{label}</span>}
      </div>
    </NavLink>
  ) : (
    <a key={i} className={className} data-index={index} onClick={onClick}>
      <div title={label}>
        {icon && <AxIcon icon={icon} size="md" />}
        {label && <span>{label}</span>}
      </div>
    </a>
  );

const LinkPopover = ({ rest }: { rest: Breadcrumb[] }) => (
  <AxPopover placement="bottom">
    <div className="ax-breadcrumb__item" data-index={4}>
      <div>...</div>
    </div>
    <AxBox>
      {rest.map(({ to = "", onClick, icon, label }, i) => (
        <LinkItem
          key={i}
          to={to}
          className="ax-breadcrumb__link"
          icon={icon}
          label={label}
          onClick={onClick}
        />
      ))}
    </AxBox>
  </AxPopover>
);

/** @internal */
export const AxBreadcrumbBar: FC<Props> = ({ items, actions = [], theme = "classic" }) => {
  const [start, rest, end] = useMemo(
    () =>
      items.length > 8 ? [items.slice(0, 3), items.slice(3, -3), items.slice(-3)] : [[], [], items],
    [items]
  );
  if (items.length === 0 && actions.length === 0) return null;

  return (
    <div className="ax-breadcrumb__bar" data-theme={theme}>
      <div>
        {start.map(({ to, icon, label, onClick }, i) => (
          <LinkItem
            key={i}
            to={to}
            icon={icon}
            label={label}
            index={start.length - i + 4}
            onClick={onClick}
          />
        ))}
        {rest.length > 0 && <LinkPopover rest={rest} />}
        {end.map(({ to, icon, label, onClick }, i) => (
          <LinkItem
            key={i}
            to={to}
            icon={icon}
            label={label}
            index={end.length - i + 4}
            onClick={onClick}
          />
        ))}
      </div>
      <div>{actions}</div>
    </div>
  );
};
