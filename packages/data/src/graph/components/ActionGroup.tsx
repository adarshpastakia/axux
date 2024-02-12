/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { type ChildrenProp } from "@axux/core/dist/types";
import { type FC } from "react";

export const ActionGroup: FC<ChildrenProp> = ({ children }) => {
  return (
    <AxButton.Group isVertical variant="flat">
      {children}
    </AxButton.Group>
  );
};
