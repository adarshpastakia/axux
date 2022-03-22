// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC } from "react";
import { AxButton } from "../buttons/Button";
import { EmptyCallback } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export const AlertClose: FC<{ onClick: EmptyCallback }> = ({ onClick }) => (
  <AxButton className="ax-alert--close" icon={AppIcons.iconClose} type="link" onClick={onClick} />
);
