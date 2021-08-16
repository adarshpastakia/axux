// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC } from "react";

export const LightBox: FC = ({ children }) => (
  <div className="ax-bg--lightest ax-padding--md">{children}</div>
);
