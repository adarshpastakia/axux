// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumb, useAxBreadcrumbService } from "../context/BreadcrumbService";
import { Globals } from "../context/Globals";
import { AxIcon } from "../icons/Icon";
import { AxBox } from "../layout/Box";
import { AxPopover } from "../overlays/Popover";

const LinkItem = ({ i = 0, to = "", index = 0, icon, label }: AnyObject) => (
  <NavLink key={i} to={to} className="ax-breadcrumb__item" data-index={index}>
    <div>
      {icon && <AxIcon icon={icon} />}
      {label && <span>{label}</span>}
    </div>
  </NavLink>
);

const LinkPopover = ({ rest }: { rest: Breadcrumb[] }) => (
  <AxPopover placement="bottom">
    <div className="ax-breadcrumb__item" data-index={4}>
      <div>...</div>
    </div>
    <AxBox>
      {rest.map(({ to, icon, label }, i) => (
        <NavLink key={i} to={to} className="ax-breadcrumb__link">
          <div>
            <AxIcon icon={icon ?? "blank"} />
            {label && <span>{label}</span>}
          </div>
        </NavLink>
      ))}
    </AxBox>
  </AxPopover>
);

/** @internal */
export const AxBreadcrumbBar = () => {
  const { breadcrumbTheme } = useContext(Globals);
  const { items, actions } = useAxBreadcrumbService();

  const [start, rest, end] = useMemo(
    () =>
      items.length > 8 ? [items.slice(0, 3), items.slice(3, -3), items.slice(-3)] : [[], [], items],
    [items]
  );
  if (items.length === 0 && actions.length === 0) return null;

  return (
    <div className="ax-breadcrumb__bar" data-theme={breadcrumbTheme}>
      <div>
        {start.map(({ to, icon, label }, i) => (
          <LinkItem key={i} to={to} icon={icon} label={label} index={start.length - i + 4} />
        ))}
        {rest.length > 0 && <LinkPopover rest={rest} />}
        {end.map(({ to, icon, label }, i) => (
          <LinkItem key={i} to={to} icon={icon} label={label} index={end.length - i + 4} />
        ))}
      </div>
      <div>{actions}</div>
    </div>
  );
};
