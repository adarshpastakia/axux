// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { AxContent, AxFlexBox, AxPage } from "@axux/core";
import { FC } from "react";

export const Page: FC = ({ children }) => (
  <AxPage paper>
    <AxContent>
      <AxFlexBox>{children}</AxFlexBox>
    </AxContent>
  </AxPage>
);
