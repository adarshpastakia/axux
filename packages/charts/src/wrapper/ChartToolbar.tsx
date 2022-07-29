/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ChildrenProp } from "@axux/core/dist/types";
import { FC } from "react";

export const ChartToolbar: FC<ChildrenProp> = ({ children }) => {
  return <div className="ax-chart__toolbar">{children}</div>;
};
