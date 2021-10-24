// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxIcon } from "../icons/Icon";
import { AllColors, Size, VFC } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface SpinnerProps {
  /**
   * Spinner color
   */
  color?: AllColors;
  /**
   * Spinner size
   */
  size?: Size;
}

/**
 * Loading spinner indicator
 * @param color
 * @param size
 * @constructor
 * @internal
 */
export const AxSpinner: VFC<SpinnerProps> = ({ color, size }) => {
  return (
    <AxIcon className="ax-spinner" spin icon={AppIcons.iconSpinner} color={color} size={size} />
  );
};
AxSpinner.displayName = "AxSpinner";
