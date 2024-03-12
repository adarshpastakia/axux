/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { handleClick, handleEnter } from "@axux/utilities/src/handlers";
import { AxIcon } from "../icons/Icon";
import { AppIcons } from "../types/appIcons";

export const Close = (cb?: AnyObject, icon = AppIcons.iconClose) => (
  <span
    className="close-x"
    role="button"
    aria-label="close"
    tabIndex={-1}
    onClick={handleClick(cb, { stopPropagation: true })}
    onKeyDown={handleEnter(cb)}
  >
    <AxIcon icon={icon} />
  </span>
);
