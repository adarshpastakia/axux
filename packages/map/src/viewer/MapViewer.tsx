/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { debounce } from "@axux/utilities";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import maplibregl, { LngLatLike, Map, StyleSpecification } from "maplibre-gl";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Basemaps } from "../components/Basemaps";
import { Draw } from "../components/Draw";
import { Zoom } from "../components/Zoom";
import { DrawCircle } from "../utils/DrawCircle";
import { DrawRectangle } from "../utils/DrawRectangle";

interface MapSource extends Omit<StyleSpecification, "version"> {
  thumbnail: string;
  label: string;
}

interface MapViewport {
  center: LngLatLike;
  zoom: number;
}

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

  useEffect(() => {
    if (refContainer.current) {
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
        defaultMode: "simple_select",
        modes: {
          "draw-circle": DrawCircle,
          "draw-rectangle": DrawRectangle,
          ...MapboxDraw.modes,
        },
      });
      refMap.current.addControl(refDraw.current as AnyObject);

      setMap(refMap.current);

      return () => {
        refMap.current?.remove();
      };
    }
  }, [refContainer, sources]);

  return (
    <MapContext.Provider
      value={{ map: map!, draw: refDraw.current!, viewport: defaultViewport }}
    >
      <div className="ax-mapviewer" onContextMenu={(e) => e.preventDefault()}>
        <div ref={refContainer} className="ax-mapviewer__container" />

        {map && (
          <div className="ax-mapviewer__tools" data-align="start">
            <Zoom />
          </div>
        )}

        {map && (
          <div className="ax-mapviewer__tools" data-align="end">
            <Basemaps sources={sources} />
            <Draw />
          </div>
        )}
      </div>
    </MapContext.Provider>
  );
};
