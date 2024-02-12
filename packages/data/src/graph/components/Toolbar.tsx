/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { AxAside, AxContent } from "@axux/core";
import { type ChildrenProp } from "@axux/core/dist/types";
import { type FC } from "react";

export const Toolbar: FC<ChildrenProp> = ({ children }) => {
  return (
    <AxAside width="auto" className="graph-toolbar">
      <AxContent
        padding="none"
        className="flex flex-col gap-1 bg-none no-scrollbars"
      >
        {children}
      </AxContent>
    </AxAside>
  );
};
