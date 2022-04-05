// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { isValidElement } from "react";
import { AxIcon } from "../icons/Icon";
import { IconType } from "../types";

export const useIcon = (icon?: IconType | JSX.Element, className?: string) => {
  if (!icon) return null;
  if (isValidElement(icon)) {
    return <span className={`ax-icon ${className ?? ""}`}>{icon}</span>;
  }

  return <AxIcon icon={icon} className={className} />;
};
