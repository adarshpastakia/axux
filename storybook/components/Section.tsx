// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC } from "react";
import { AxBox, AxDivider, AxHeading, AxSpacer } from "@axux/core";

export const Section: FC<{ title: string }> = ({ children, title }) => (
  <AxBox marginBottom="xxl">
    <AxHeading level={2} color="primary">
      {title}
    </AxHeading>
    <AxDivider rainbow />
    <AxSpacer />
    {children}
  </AxBox>
);
