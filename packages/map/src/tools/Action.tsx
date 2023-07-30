/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { useEffect, useRef, type FC } from "react";
import { useMapContext } from "../context/MapContext";

export interface ActionProps {
  icon: string;
  isDisabled?: boolean;
  position?: "top-start" | "top-end";
  tooltip?: string;
  index?: number;
  onClick: ({ map, view }: { map: __esri.Map; view: __esri.MapView }) => void;
}

const PLACEMENT_MAP: KeyValue = {
  "top-start": "top-leading",
  "top-end": "top-trailing",
};

/**
 * AxMap toolbar action button
 */
export const Action: FC<ActionProps> = ({
  icon,
  tooltip,
  isDisabled,
  position = "top-start",
  index,
  onClick,
}) => {
  const refWidget = useRef<HTMLDivElement>(null);
  const { map, view } = useMapContext();

  useEffect(() => {
    if (view) {
      const widget = refWidget.current as HTMLElement;
      view.ui.add(widget, { index, position: PLACEMENT_MAP[position] });

      return () => {
        view.ui.remove(widget);
      };
    }
  }, []);

  return (
    <div className="esri-widget" ref={refWidget}>
      {map && view && (
        <button
          className="esri-widget--button esri-widget esri-interactive"
          data-tooltip={tooltip}
          data-tooltip-placement="right"
          onClick={() => onClick({ map, view })}
          disabled={isDisabled}
        >
          <AxIcon className="esri-icon" icon={icon} />
        </button>
      )}
    </div>
  );
};
