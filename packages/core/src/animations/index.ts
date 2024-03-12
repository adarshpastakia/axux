/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Check, Cross, Info } from "./Circles";
import { Bars, Card, Spinner } from "./Loaders";

export { Indicator } from "./Loaders";
export { AxProgress } from "./Progress";

/**
 * Animations for loading indicators, success marks
 *
 * @component Bars - Loading bars
 * @component Spinner - Loading spinner
 * @component Card - Loading card pulse
 * @component Check - Animated check mark
 * @component Cross - Animated cross mark
 * @component Info - Animated info mark
 */
export const AxAnimation = {
  /**
   * Animated circle spinner
   */
  Spinner,
  /**
   * Animated loading bars
   */
  Bars,
  /**
   * SVG animated check mark
   */
  Check,
  /**
   * SVG animated cross mark
   */
  Cross,
  /**
   * SVG animated info 'i'
   */
  Info,
  /**
   * Animated content pulse
   */
  Card,
};

AxAnimation.Bars.displayName = "AxAnimation.Bars";
AxAnimation.Card.displayName = "AxAnimation.Card";
AxAnimation.Check.displayName = "AxAnimation.Check";
AxAnimation.Cross.displayName = "AxAnimation.Cross";
AxAnimation.Info.displayName = "AxAnimation.Info";
AxAnimation.Spinner.displayName = "AxAnimation.Spinner";
