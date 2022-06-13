// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { AxText } from "@axux/core";
import { FC } from "react";

export const StateLabel: FC = ({ children }) => (
  <AxText block transform="title" align="center" color="muted" size="xs">
    {children}
  </AxText>
);
