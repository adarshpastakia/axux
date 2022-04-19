// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { AxBox, AxDivider, AxHeading, AxSpacer } from "@axux/core";
import { FC } from "react";

export const Section: FC<{ title: string }> = ({ title, children }) => (
  <AxBox marginBottom="xxl">
    <AxHeading forDisplay level={5} color="primary">
      {title}
    </AxHeading>
    <AxDivider rainbow />
    <AxSpacer />
    {children}
  </AxBox>
);
