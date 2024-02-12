/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FC,
  useImperativeHandle,
} from "react";
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
  defaultLayout,
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
    console.log("render graph");
    graph.loadData(data as AnyObject);
  }, [graph.loadData, data]);

  const changeMode = useCallback(
    (mode?: "brush" | "lasso") => {
      graph.ref?.setMode(mode ?? (readOnly ? "default" : "edit"));
      container && (container.dataset.brush = mode ? "true" : "false");
    },
    [graph.ref, container, readOnly]
  );

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
