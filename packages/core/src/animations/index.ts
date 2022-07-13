/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Check, Cross, Info } from "./Circles";
import { Bars, Card, Spinner } from "./Loaders";

export { Indicator } from "./Loaders";
export { AxProgress } from "./Progress";

export const AxAnimation = { Spinner, Bars, Check, Cross, Info, Card };

AxAnimation.Bars.displayName = "AxAnimation.Bars";
AxAnimation.Card.displayName = "AxAnimation.Card";
AxAnimation.Check.displayName = "AxAnimation.Check";
AxAnimation.Cross.displayName = "AxAnimation.Cross";
AxAnimation.Info.displayName = "AxAnimation.Info";
AxAnimation.Spinner.displayName = "AxAnimation.Spinner";
