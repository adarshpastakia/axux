/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { useEffect, useState } from "react";
import { useGraphInternal } from "../context/GraphContext";
import { GraphIcons } from "../types/icons";

export const ActionZoom = () => {
  const { graph } = useGraphInternal();

  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    graph.ref?.on("viewportchange", () => {
      const zoom = graph.ref?.getZoom() ?? 1;
      setZoom(zoom <= 0.25 ? -1 : zoom >= 15 ? 1 : 0);
    });
    return () => {
      graph.ref?.off("viewportchange");
    };
  }, [graph.ref]);

  return (
    <AxButton.Group isVertical variant="flat">
      <AxButton
        className="flush"
        icon={GraphIcons.zoomIn}
        isDisabled={graph.isClear || zoom === 1}
        onClick={() => graph.ref?.zoom(1.5) as AnyObject}
      />
      <AxButton
        className="flush"
        icon={GraphIcons.zoomOut}
        isDisabled={graph.isClear || zoom === -1}
        onClick={() => graph.ref?.zoom(0.5) as AnyObject}
      />
      <AxButton
        className="flush"
        icon={GraphIcons.zoomReset}
        isDisabled={graph.isClear}
        onClick={graph.resetView}
      />
    </AxButton.Group>
  );
};
