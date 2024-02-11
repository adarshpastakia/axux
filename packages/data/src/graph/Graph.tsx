/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { GraphProvider } from "./context/GraphContext";
import { type GraphProps } from "./types";

export const AxGraph: FC<GraphProps> = (props) => {
  return <GraphProvider {...props} />;
};
