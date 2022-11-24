/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import Basemap from "@arcgis/core/Basemap";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import TileInfo from "@arcgis/core/layers/support/TileInfo";
import GeoMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { ChildrenProp } from "@axux/core/dist/types";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  DefaultViewProps,
  DEFAULT_VIEWPORT,
  MapViewerProps,
  MapViewport,
} from "../constants/types";
import { makeBasemap } from "../utils";

const MapContext = createContext<{
  map?: GeoMap;
  view?: MapView;
  basemaps: Map<string, Basemap>;
  defaultViewport: MapViewport;
  viewport: MapViewport;
  minZoom: number;
  maxZoom: number;
}>({} as AnyObject);

export const useMapContext = () => useContext(MapContext);

export const MapProvider: FC<MapViewerProps & ChildrenProp> = ({
  defaultViewport,
  minZoom,
  maxZoom,
  sources,
  defaultSource,
  children,
}) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();

  const [map, setMap] = useState<GeoMap>();
  const [view, setView] = useState<MapView>();
  const [basemaps, setBasemaps] = useState<Map<string, Basemap>>(new Map());

  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);

  useLayoutEffect(() => {
    defaultViewport && setViewport(defaultViewport);
  }, [defaultViewport]);

  useLayoutEffect(() => {
    startTransition(() => {
      void view?.goTo(viewport);
    });
  }, [view, viewport]);

  useEffect(() => {
    if (!(sources?.length > 0)) {
      throw Error("Map sources not provided");
    }
    const basemaps = new Map(
      sources.map((source) => [source.id, makeBasemap(source)])
    );
    let defaultBasemap;
    if (basemaps.has(defaultSource)) {
      defaultBasemap = basemaps.get(defaultSource);
    } else {
      defaultBasemap = basemaps.get(sources[0].id);
    }

    const map = new GeoMap({
      basemap: defaultBasemap,
    });

    const viewProps = DefaultViewProps;
    viewProps.constraints.lods = TileInfo.create({
      spatialReference: new SpatialReference({ wkid: 4326 }),
    }).lods;

    const view = new MapView({
      map,
      container: refContainer.current as HTMLDivElement,
      ...viewProps,
    });

    startTransition(() => {
      setBasemaps(basemaps);
      setView(view);
      setMap(map);
    });

    return () => {
      map.destroy();
    };
  }, [sources, defaultSource, minZoom, maxZoom]);

  return (
    <MapContext.Provider
      value={{
        minZoom,
        maxZoom,
        viewport,
        map,
        view,
        basemaps,
        defaultViewport: defaultViewport ?? DEFAULT_VIEWPORT,
      }}
    >
      <div className="ax-mapviewer">
        <div ref={refContainer} className="ax-mapviewer__container" />
        {children}
      </div>
    </MapContext.Provider>
  );
};
MapProvider.displayName = "AxMap.Provider";
