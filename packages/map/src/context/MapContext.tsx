/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import type Basemap from "@arcgis/core/Basemap";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import TileInfo from "@arcgis/core/layers/support/TileInfo";
import GeoMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { type ChildrenProp } from "@axux/core/dist/types";
import {
  createContext,
  type FC,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  DefaultViewProps,
  DEFAULT_VIEWPORT,
  type MapViewerProps,
  type MapViewport,
} from "../constants/types";
import { useProjection } from "../hooks/useProjection";
import { convertToDMS, makeBasemap } from "../utils";

const MapContext = createContext<{
  map?: GeoMap;
  view?: MapView;
  basemaps: Map<string, Basemap>;
  defaultViewport: MapViewport;
  viewport: MapViewport;
}>({} as AnyObject);

export const useMapContext = () => useContext(MapContext);

export const MapProvider: FC<MapViewerProps & ChildrenProp> = ({
  defaultViewport,
  onLoading,
  minZoom,
  maxZoom,
  sources,
  defaultSource,
  children,
  mapRef,
}) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();
  const { getGeometry } = useProjection();

  const [map, setMap] = useState<GeoMap>();
  const [view, setView] = useState<MapView>();
  const [basemaps, setBasemaps] = useState<Map<string, Basemap>>(new Map());

  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);

  useLayoutEffect(() => {
    defaultViewport && setViewport(defaultViewport);
  }, [defaultViewport]);

  useImperativeHandle(
    mapRef,
    () => ({
      exportMap: async () => {
        if (view) {
          const extent = await getGeometry(view.extent).then(
            (extent?: KeyValue) => {
              let infoText = "";
              if (extent) {
                infoText += convertToDMS(extent.ymin, true) + ", ";
                infoText += convertToDMS(extent.xmin) + " - ";
                infoText += convertToDMS(extent.ymax, true) + ", ";
                infoText += convertToDMS(extent.xmax);
              }
              return infoText;
            }
          );
          const { dataUrl: image } = await view.takeScreenshot({
            ignorePadding: true,
            width: 786 * 2,
            height: 432 * 2,
            format: "jpg",
          });
          return { image, extent };
        }
        return { image: "", extent: "" };
      },
    }),
    [view]
  );

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

    void view.when(() => {
      view.on("key-down", (evt) => {
        if (evt.key === "Shift" && !evt.repeat) {
          view.navigation.mouseWheelZoomEnabled = true;
        }
      });
      view.on("key-up", (evt) => {
        if (evt.key === "Shift") {
          view.navigation.mouseWheelZoomEnabled = false;
        }
      });
      view.focus();
    });

    view.watch("updating", () => {
      onLoading?.(view.updating);
    });

    startTransition(() => {
      setBasemaps(basemaps);
      setView(view);
      setMap(map);
    });

    return () => {
      map.destroy();
    };
  }, [sources, defaultSource]);

  return (
    <MapContext.Provider
      value={{
        viewport,
        map,
        view,
        basemaps,
        defaultViewport: defaultViewport ?? DEFAULT_VIEWPORT,
      }}
    >
      <div className="mapviewer">
        <div ref={refContainer} className="mapviewer__container" />
        {map && view && children}
      </div>
    </MapContext.Provider>
  );
};
MapProvider.displayName = "Map.Provider";
