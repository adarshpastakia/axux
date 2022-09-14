/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxContent } from "@axux/core";
import { debounce } from "@axux/utilities";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import maplibregl, { LngLatLike, Map, StyleSpecification } from "maplibre-gl";
import {
  createContext,
  FC,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Basemaps } from "../components/Basemaps";
import { Draw } from "../components/Draw";
import { FilterBar } from "../components/FilterBar";
import { Zoom } from "../components/Zoom";
import {
  DragCircle,
  DRAG_MODES,
  DrawCircle,
  DrawRectangle,
  Hilight,
} from "../drawModes";

interface MapSource extends Omit<StyleSpecification, "version"> {
  thumbnail: string;
  label: string;
}

interface MapViewport {
  center: LngLatLike;
  zoom: number;
}

const iconError =
  "M9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21L3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19.03 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3L20.34,3.03L15,5.1L9,3M8,5.45V17.15L5,18.31V6.46L8,5.45M10,5.47L14,6.87V18.53L10,17.13V5.47M19,5.7V17.54L16,18.55V6.86L19,5.7M7.46,6.3L5.57,6.97V9.12L7.46,8.45V6.3M7.46,9.05L5.57,9.72V11.87L7.46,11.2V9.05M7.46,11.8L5.57,12.47V14.62L7.46,13.95V11.8M7.46,14.55L5.57,15.22V17.37L7.46,16.7V14.55Z";

export interface MapViewerProps {
  sources: MapSource[];
  minZoom: number;
  maxZoom: number;
  defaultViewport?: MapViewport;
  onViewportChange?: (viewport: MapViewport) => void;
}

const DEFAULT_VIEWPORT: MapViewport = {
  center: [54.47509919867679, 24.413736135087568], // starting position [lng, lat]
  zoom: 9, // starting zoom,
};

const MapContext = createContext<{
  map: Map;
  draw: MapboxDraw;
  viewport: MapViewport;
}>({} as AnyObject);

export const useMapContext = () => useContext(MapContext);

export const AxMapViewer: FC<MapViewerProps> = ({
  sources = [],
  minZoom = 1,
  maxZoom = 18,
  defaultViewport = DEFAULT_VIEWPORT,
  onViewportChange,
}) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refMap = useRef<Map>();
  const refDraw = useRef<MapboxDraw>();
  const [map, setMap] = useState<Map>();
  const [error, setError] = useState<string>();

  const handleViewportChange = useMemo(
    () =>
      debounce(
        (e) =>
          !e.resetView &&
          onViewportChange?.({
            center: refMap.current!.getCenter().toArray() as [number, number],
            zoom: refMap.current!.getZoom(),
          }),
        200
      ),
    [onViewportChange]
  );

  const loadMap = useCallback(() => {
    if (refContainer.current) {
      setError("");
      refMap.current?.remove();

      refMap.current = new maplibregl.Map({
        container: refContainer.current,
        style: {
          version: 8,
          ...sources[0],
        },
        minZoom,
        maxZoom,
        maxPitch: 0,
        dragRotate: false,
        ...defaultViewport,
      });

      refMap.current?.on("load", () => {
        refMap.current?.on("moveend", handleViewportChange);
        refMap.current?.on("zoomend", handleViewportChange);
      });

      refDraw.current = new MapboxDraw({
        displayControlsDefault: false,
        boxSelect: false,
        defaultMode: DRAG_MODES.DRAG_CIRCLE,
        modes: {
          [DRAG_MODES.HILIGHT]: Hilight,
          [DRAG_MODES.DRAG_CIRCLE]: DragCircle,
          [DRAG_MODES.DRAW_CIRCLE]: DrawCircle,
          [DRAG_MODES.DRAW_RECTANGLE]: DrawRectangle,
        },
        styles: [
          {
            id: "highlight-border",
            type: "line",
            filter: ["all", ["==", "active", "true"]],
            paint: {
              "line-color": "#f97316",
              "line-dasharray": [4, 4],
              "line-width": 2,
            },
          },
          {
            id: "border",
            type: "line",
            filter: ["all", ["!=", "active", "true"]],
            paint: {
              "line-color": "#0ea5e9",
              "line-width": 2,
            },
          },
          {
            id: "highlight-fill",
            type: "fill",
            filter: ["all", ["==", "active", "true"]],
            paint: {
              "fill-color": "#f97316",
              "fill-opacity": 0.1,
            },
          },
          {
            id: "fill",
            type: "fill",
            filter: ["all", ["!=", "active", "true"]],
            paint: {
              "fill-color": "#0ea5e9",
              "fill-opacity": 0.1,
            },
          },
          {
            id: "hover",
            type: "fill",
            filter: ["all", ["==", "hover", "true"]],
            paint: {
              "fill-color": "#0ea5e9",
              "fill-opacity": 0.3,
            },
          },
        ],
      });
      refMap.current.addControl(refDraw.current as AnyObject);

      refMap.current.once("load", () => {
        setMap(refMap.current);
      });

      refMap.current.on("error", ({ error }) => {
        setError(error.message);
      });
    }
  }, [sources]);

  useEffect(() => {
    loadMap();
    return () => {
      refMap.current?.remove();
    };
  }, [refContainer, loadMap]);

  return (
    <MapContext.Provider
      value={{ map: map!, draw: refDraw.current!, viewport: defaultViewport }}
    >
      <div className="ax-mapviewer" onContextMenu={(e) => e.preventDefault()}>
        <div ref={refContainer} className="ax-mapviewer__container" />

        {map && (
          <Fragment>
            <div className="ax-mapviewer__tools" data-align="start">
              <Zoom />
            </div>
            <div className="ax-mapviewer__tools" data-align="end">
              <Basemaps sources={sources} />
              <Draw />
            </div>
            <FilterBar />
          </Fragment>
        )}

        {error && (
          <AxContent.Empty
            message={error}
            icon={iconError}
            title="MapLibre"
            actions={[<AxButton onClick={loadMap}>Reload</AxButton>]}
          />
        )}
      </div>
    </MapContext.Provider>
  );
};
