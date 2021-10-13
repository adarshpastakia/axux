// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useContext } from "react";
import { AxBreadcrumbBar } from "../appbars/Breadcrumbs";
import { useAxBreadcrumbService } from "../context/BreadcrumbService";
import { Globals } from "../context/Globals";

/** @internal */
export const ViewportBreadcrumbs = () => {
  const { breadcrumbTheme } = useContext(Globals);
  const { items, actions } = useAxBreadcrumbService();

  return <AxBreadcrumbBar items={items} actions={actions} theme={breadcrumbTheme} />;
};
ViewportBreadcrumbs.displayName = "AxViewport.Breadcrumbs";
