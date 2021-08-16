// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Heading } from "@storybook/addon-docs";
import { FC } from "react";

export const Section: FC<{ title: string }> = ({ children, title }) => (
  <div className="ax-container ax-margin--b--lg">
    <Heading>{title}</Heading>
    <div>{children}</div>
  </div>
);
