/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { type ReactNode, type RefObject } from "react";

export type LngLatLike =
  | {
      lng: number;
      lat: number;
    }
  | {
      lon: number;
      lat: number;
    }
  | {
      longitude: number;
      latitude: number;
    }
  | [lon: number | string, lat: number | string]
  | string;

export interface MapSource {
  id: string;
  title: string;
  thumb?: string;
  type: "vector" | "raster";
  url: string;
}

export interface MapViewport {
  center?: [lon: number, lat: number];
  zoom?: number;
}

export interface MapViewerProps {
  children?: ReactNode | ReactNode[];
  sources: MapSource[];
  defaultSource: string;

  mapRef?: RefObject<{
    exportMap: () => Promise<{ image: string; extent: AnyObject }>;
  }>;
  minZoom?: number;
  maxZoom?: number;
  defaultViewport?: MapViewport;
  onLoading?: (isLoading: boolean) => void;
  onViewportChange?: (viewport: MapViewport) => void;
}

export interface MapEvent extends KeyValue {
  location: LngLatLike;
  timestamp?: string | number | Date;
  group?: string;
}

export const DEFAULT_VIEWPORT: MapViewport = {
  center: [54.47509919867679, 24.413736135087568], // starting position [lng, lat]
  zoom: 9, // starting zoom,
};

export const DefaultViewProps: KeyValue = {
  constraints: {
    minZoom: 3,
    maxZoom: 24,
    rotationEnabled: false,
  },
  navigation: {
    mouseWheelZoomEnabled: false,
  },
  popup: {
    autoCloseEnabled: true,
    dockEnabled: false,
    dockOptions: {
      breakpoint: false,
      position: "top-right",
      buttonEnabled: false,
    },
    defaultPopupTemplateEnabled: true,
  },
  ui: {
    padding: { left: 15, top: 15, right: 15, bottom: 15 },
    components: [],
  },
  resizeAlign: "center",
};

export const ICON_MARKER =
  "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";

export const ICON_COMPARE =
  "M13,23H11V1H13V23M9,19H5V5H9V3H5C3.89,3 3,3.89 3,5V19C3,20.11 3.9,21 5,21H9V19M19,7V9H21V7H19M19,5H21C21,3.89 20.1,3 19,3V5M21,15H19V17H21V15M19,11V13H21V11H19M17,3H15V5H17V3M19,21C20.11,21 21,20.11 21,19H19V21M17,19H15V21H17V19Z";
