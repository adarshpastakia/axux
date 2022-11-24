/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import MapView from "@arcgis/core/views/MapView";
import { isEmpty } from "@axux/utilities";
import { Fragment, useCallback, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { MapViewport } from "../constants/types";
import { useMapContext } from "../context/MapContext";

interface ViewProp {
  view: MapView;
}
interface ViewportProp {
  defaultViewport: MapViewport;
}

const HomeButton = ({ view, defaultViewport }: ViewProp & ViewportProp) => {
  const gotoHome = useCallback(() => {
    view.goTo?.(defaultViewport);
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

const Navigator = ({ view }: ViewProp) => {
  return (
    <Fragment>
      <button className="esri-widget--button esri-widget esri-interactive">
        <span className="esri-icon esri-icon-left-arrow" />
      </button>
      <button className="esri-widget--button esri-widget esri-interactive">
        <span className="esri-icon esri-icon-right-arrow" />
      </button>
    </Fragment>
  );
};

const NavWidget = ({ view, defaultViewport }: ViewProp & ViewportProp) => {
  const widget = document.createElement("div");
  view.container?.appendChild(widget);
  const root = ReactDOM.createRoot(widget);
  root.render(
    <div className="esri-widget">
      <HomeButton view={view} defaultViewport={defaultViewport} />
      <Navigator view={view} />
    </div>
  );
  return widget;
};

export const Navigation = () => {
  const { view, defaultViewport } = useMapContext();

  useEffect(() => {
    if (!isEmpty(view)) {
      const navAction = NavWidget({ view, defaultViewport });
      view.ui?.add(navAction, { index: 1, position: "top-leading" });

      return () => {
        view.ui?.remove(navAction);
        navAction.remove();
      };
    }
  }, [view]);

  return null;
};
