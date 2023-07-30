/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { AxAnimation, AxIcon } from "@axux/core";
import { useEffect, useRef, type FC } from "react";
import { ICON_COMPARE } from "../constants/types";
import { useMapContext } from "../context/MapContext";

export const CompareTool: FC<{
  isLoading: boolean;
  isComparing: boolean;
  onCompare: () => void;
  onCancel: () => void;
}> = ({ onCompare, onCancel, isLoading, isComparing }) => {
  const refWidget = useRef<HTMLDivElement>(null);
  const { map, view } = useMapContext();

  useEffect(() => {
    if (view) {
      const widget = refWidget.current as HTMLElement;
      view.ui.add(widget, { index: -3, position: "top-trailing" });

      return () => {
        view.ui.remove(widget);
      };
    }
  }, []);

  return (
    <div className="esri-widget" ref={refWidget}>
      {map && view && (
        <button
          onClick={isComparing ? onCancel : onCompare}
          className="esri-widget--button esri-widget esri-interactive"
          data-tooltip="Compare"
          data-tooltip-placement="left"
        >
          {!isLoading && !isComparing && (
            <AxIcon className="esri-icon text-base" icon={ICON_COMPARE} />
          )}
          {!isLoading && isComparing && (
            <span className="esri-icon esri-icon-close" />
          )}
          {isLoading && <AxAnimation.Spinner />}
        </button>
      )}
    </div>
  );
};
