/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

export interface MapSource {
  id: string;
  title: string;
  thumbnail?: string;
  type: "vector" | "raster";
  url: string;
}

export interface MapViewport {
  center?: [number, number] | string;
  zoom?: number;
}

export interface MapViewerProps {
  sources: MapSource[];
  defaultSource: string;

  minZoom: number;
  maxZoom: number;
  defaultViewport?: MapViewport;
  onViewportChange?: (viewport: MapViewport) => void;
}

export const DEFAULT_VIEWPORT: MapViewport = {
  center: [54.47509919867679, 24.413736135087568], // starting position [lng, lat]
  zoom: 9, // starting zoom,
};

export const DefaultViewProps: KeyValue = {
  constraints: {
    minZoom: 4,
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
    padding: { left: 15, top: 15, right: 15, bottom: 45 },
    components: ["zoom"],
  },
  resizeAlign: "center",
};
