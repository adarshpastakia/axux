/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import type MapView from "@arcgis/core/views/MapView";
import { useDebounce } from "@axux/core";
import { isEqual } from "@axux/utilities";
import { type FC, Fragment, useCallback, useEffect, useRef, useState } from "react";
import { type MapViewport } from "../constants/types";
import { useMapContext } from "../context/MapContext";

const HomeButton = () => {
  const { view, defaultViewport } = useMapContext();
  const gotoHome = useCallback(() => {
    void view?.goTo(defaultViewport);
  }, [view, defaultViewport]);
  return (
    <button
      className="esri-widget--button esri-widget esri-interactive"
      onClick={gotoHome}
    >
      <span className="esri-icon esri-icon-home" />
    </button>
  );
};

const Navigator = () => {
  const { view } = useMapContext();

  const now = useRef(-1);
  const history = useRef<MapViewport[]>([]);
  const watchHandle = useRef<__esri.WatchHandle>();

  const [{ prev, next }, setActions] = useState({ prev: false, next: false });

  const handleChange = useDebounce(() => {
    if (view) {
      const newExtent: MapViewport = {
        zoom: view.zoom,
        center: [view.center.longitude, view.center.latitude],
      };
      if (!isEqual(newExtent, history.current[now.current])) {
        // clear forward history and add new extent
        history.current.splice(now.current + 1, 99, newExtent);
        // reduce history down to max 50 items
        history.current = history.current.slice(-50);
        // set now to last item in history
        now.current = history.current.length - 1;
        setActions({ prev: history.current.length > 1, next: false });
      }
    }
  }, 250);

  const startWatch = useRef((view: MapView) => {
    watchHandle.current?.remove();
    watchHandle.current = view.watch("extent", handleChange);
  });

  const handleNavigate = useCallback(
    (diff = 0) => {
      watchHandle.current?.remove();
      now.current += diff;
      setActions({
        prev: now.current > 0,
        next: now.current < history.current.length - 1,
      });
      void view?.goTo(history.current[now.current]).then(() => {
        view && startWatch.current(view);
      });
    },
    [view, handleChange]
  );

  useEffect(() => {
    view && startWatch.current(view);
  }, [view]);

  return (
    <Fragment>
      <button
        disabled={!prev}
        onClick={() => handleNavigate(-1)}
        className="esri-widget--button esri-widget esri-interactive"
      >
        <span className="esri-icon esri-icon-left-arrow" />
      </button>
      <button
        disabled={!next}
        onClick={() => handleNavigate(+1)}
        className="esri-widget--button esri-widget esri-interactive"
      >
        <span className="esri-icon esri-icon-right-arrow" />
      </button>
    </Fragment>
  );
};

/**
 * AxMap toolbar view changes with history
 */
export const Navigation: FC = () => {
  const refWidget = useRef<HTMLDivElement>(null);
  const { view } = useMapContext();

  useEffect(() => {
    if (view) {
      const widget = refWidget.current as HTMLElement;
      view.ui.add(widget, { index: -2, position: "top-leading" });

      return () => {
        view.ui.remove(widget);
      };
    }
  }, [view]);

  return (
    <div className="esri-widget" ref={refWidget}>
      <HomeButton />
      {view && <Navigator />}
    </div>
  );
};
