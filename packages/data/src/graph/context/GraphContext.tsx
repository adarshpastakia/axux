/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { createContext, useContext, useEffect, useState, type FC } from "react";
import { Toolbar } from "../components/Toolbar";
import { useGraph } from "../hooks/useGraph";
import { type GraphProps } from "../types";

const GraphContext = createContext<{ graph: ReturnType<typeof useGraph> }>(
  {} as AnyObject
);

export const GraphProvider: FC<GraphProps> = ({
  data,
  colorMap,
  defaultLayout,
  allowInteraction,
  onNodeExpand,
}) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const graph = useGraph(container);

  useEffect(() => {
    graph.restyle(colorMap);
  }, [graph.restyle, colorMap]);

  useEffect(() => {
    graph.resetLayout(defaultLayout);
  }, [graph.resetLayout, defaultLayout]);

  useEffect(() => {
    graph.ref?.setMode(allowInteraction ? "edit" : "default");
  }, [graph.ref, allowInteraction]);

  useEffect(() => {
    console.log("render graph");
    graph.loadData(data as AnyObject);
  }, [graph.loadData, data]);

  return (
    <GraphContext.Provider value={{ graph }}>
      <div className="ax-graph-viewer">
        <div className="ax-graph__container" ref={setContainer} />
        <Toolbar
          allowInteraction={allowInteraction}
          onNodeExpand={onNodeExpand}
        />
      </div>
    </GraphContext.Provider>
  );
};

export const useGraphContext = () => useContext(GraphContext);
