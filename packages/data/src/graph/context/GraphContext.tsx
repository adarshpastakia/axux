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
  styleMap,
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
    graph.restyle(styleMap);
  }, [graph.restyle, styleMap]);

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

  const [contextMenu, setContextMenu] = useState<KeyValue>();
  useEffect(() => {
    graph.ref?.addPlugins([
      {
        key: "contextmenu",
        type: "contextmenu",
        trigger: "contextmenu",
        offsetX: -1 * (container?.offsetLeft ?? 0),
        className: "ax-graph__menu-container",
        itemTypes: ["node", "edge", "combo", "canvas"],
        shouldBegin: () => {
          return !!graph.ref?.getAllNodesData()?.length;
        },
        onHide: () => {
          document?.querySelector(".ax-graph__menu-portal")?.remove();
        },
        /** async string menu */
        getContent: (e: IG6GraphEvent) => {
          setTimeout(() => {
            let item: AnyObject = { type: "canvas" };
            if (e.itemType === "node") item = graph.ref?.getNodeData(e.itemId);
            if (e.itemType === "edge") item = graph.ref?.getEdgeData(e.itemId);
            if (e.itemType === "combo")
              item = graph.ref?.getComboData(e.itemId);
            if (e.itemId && !graph.ref?.getItemState(e.itemId, "selected")) {
              const nodes =
                graph.ref?.findIdByState("node", "selected", true) ?? [];
              const edges =
                graph.ref?.findIdByState("edge", "selected", true) ?? [];
              const combos =
                graph.ref?.findIdByState("combo", "selected", true) ?? [];
              nodes?.length &&
                graph.ref?.setItemState(
                  [...nodes, ...edges, ...combos],
                  "selected",
                  false
                );
            }
            e.itemId && graph.ref?.setItemState(e.itemId, "selected", true);
            setContextMenu({ type: e.itemType, ...item });
          }, 100);
          return "<div class='ax-graph__menu-portal'/>";
        },
      },
    ]);
  }, [graph.ref]);

  return (
    <GraphContext.Provider
      value={{ graph, setContainer, changeMode, onNodeExpand }}
    >
      <div className="ax-graph-viewer">{children}</div>

      {contextMenu && <ContextMenu {...contextMenu} />}
    </GraphContext.Provider>
  );
};

export const useGraphInternal = () => useContext(GraphContext);

export const useGraphContext = () => {
  const { graph } = useContext(GraphContext);
  return graph;
};
