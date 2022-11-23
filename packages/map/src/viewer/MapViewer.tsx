/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";
import { MapViewerProps } from "../constants/types";
import { MapProvider } from "../context/MapContext";

export const MapViewer: FC<MapViewerProps> = (props) => {
  return <MapProvider {...props}>{/* {children} */}</MapProvider>;
};
MapViewer.displayName = "AxMap.Viewer";
