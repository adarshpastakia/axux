// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC } from "react";

export const Section: FC<{ title: string }> = ({ children, title }) => (
  <div className="ax-container ax-margin--b--lg">
    <div className="ax-heading--3 ax-color--secondary ">{title}</div>
    <hr className="ax-margin--b--sm" />
    <div>{children}</div>
  </div>
);
