/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */
import { useEffect } from "react";
import { useGraphInternal } from "../context/GraphContext";

export const Legend = () => {
  const { graph } = useGraphInternal();

  useEffect(() => {
    !graph.isClear &&
      graph.ref?.addPlugins([
        {
          key: "default-legend",
          type: "legend",
          className: "ax-graph__legend",
          size: [250, "fit-content"],
          node: {
            enable: true,
            padding: [20, 20],
            title: "node-legend",
            typeField: "nodeType",
            cols: 4,
            labelStyle: {
              spacing: 8,
              color: "#333",
            },
          },
          edge: {
            enable: true,
            padding: [10, 20],
            title: "edge-legend",
            typeField: "edgeType",
            cols: 4,
            labelStyle: {
              spacing: 8,
              color: "#333",
            },
          },
        },
      ]);

    return () => {
      graph.ref?.removePlugins(["default-legend"]);
    };
  }, [graph.ref, graph.isClear]);

  return null;
};
