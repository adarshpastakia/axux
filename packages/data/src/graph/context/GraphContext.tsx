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

const GraphContext = createContext({});

export const GraphProvider: FC<GraphProps> = ({ data }) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const graph = useGraph(container);

  useEffect(() => {
    if (graph) {
      console.log("render graph");
      graph.loadData(data as AnyObject);
    }
  }, [graph, data]);

  return (
    <GraphContext.Provider value={{}}>
      <div className="ax-graph-viewer">
        <div className="ax-graph__container" ref={setContainer} />
        <Toolbar />
      </div>
    </GraphContext.Provider>
  );
};

export const useGraphContext = () => useContext(GraphContext);
