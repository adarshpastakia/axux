/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type IG6GraphEvent } from "@antv/g6";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
  type FC,
} from "react";
import { ContextMenu } from "../components/ContextMenu";
import { useGraph } from "../hooks/useGraph";
import { type GraphProps } from "../types";

const GraphContext = createContext<{
  graph: ReturnType<typeof useGraph>;
  setContainer: (el: HTMLDivElement | null) => void;
  changeMode: (mode?: "brush" | "lasso") => void;
  onNodeExpand: GraphProps["onNodeExpand"];
}>({} as AnyObject);

export const GraphProvider: FC<GraphProps> = ({
  data,
  colorMap,
  defaultLayout = "auto",
  readOnly,
  children,
  graphRef,
  onNodeExpand,
}) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const graph = useGraph(container);

  useImperativeHandle(graphRef, () => graph, [graph]);

  useEffect(() => {
    graph.restyle(colorMap);
  }, [graph.restyle, colorMap]);

  useEffect(() => {
    graph.resetLayout(defaultLayout);
  }, [graph.resetLayout, defaultLayout]);

  useEffect(() => {
    graph.ref?.setMode(readOnly ? "default" : "edit");
  }, [graph.ref, readOnly]);

  useEffect(() => {
    data && graph.loadData(data as AnyObject);
  }, [graph.loadData, data]);

  const changeMode = useCallback(
    (mode?: "brush" | "lasso") => {
      graph.ref?.setMode(mode ?? (readOnly ? "default" : "edit"));
      container && (container.dataset.brush = mode ? "true" : "false");
    },
    [graph.ref, container, readOnly]
  );

  useEffect(() => {
    graph.ref?.addPlugins([
      {
        key: "contextmenu",
        type: "contextmenu",
        trigger: "contextmenu",
        className: "ax-graph__menu-container",
        itemTypes: ["node", "edge", "combo", "canvas"],
        /** async string menu */
        getContent: (e: IG6GraphEvent) => {
          setTimeout(() => {
            const el = container?.querySelector(
              ".ax-graph__menu-container"
            ) as HTMLDivElement;
            let item: AnyObject = { type: "canvas" };
            if (e.itemType === "node") item = graph.ref?.getNodeData(e.itemId);
            if (e.itemType === "edge") item = graph.ref?.getEdgeData(e.itemId);
            if (e.itemType === "combo")
              item = graph.ref?.getComboData(e.itemId);
            el && ContextMenu(el, { type: e.itemType, ...item });
          }, 500);
          return "";
        },
      },
    ]);
  }, [graph.ref]);

  return (
    <GraphContext.Provider
      value={{ graph, setContainer, changeMode, onNodeExpand }}
    >
      <div className="ax-graph-viewer">{children}</div>
    </GraphContext.Provider>
  );
};

export const useGraphInternal = () => useContext(GraphContext);

export const useGraphContext = () => {
  const { graph } = useContext(GraphContext);
  return graph;
};
