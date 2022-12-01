/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { FC, useEffect, useRef } from "react";
import { useMapContext } from "../context/MapContext";

export interface Props {
  icon: string;
  isDisabled?: boolean;
  position?: "top-start" | "top-end";
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
export const Action: FC<Props> = ({
  icon,
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
  }, [view]);

  return (
    <div className="esri-widget" ref={refWidget}>
      {map && view && (
        <button
          className="esri-widget--button esri-widget esri-interactive"
          onClick={() => onClick({ map, view })}
          disabled={isDisabled}
        >
          <AxIcon className="esri-icon" icon={icon} />
        </button>
      )}
    </div>
  );
};
