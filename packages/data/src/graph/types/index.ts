/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type EdgeModel, type NodeModel } from "@antv/g6";
import { type ChildrenProp } from "@axux/core/dist/types";
import { type RefObject } from "react";
import { type useGraph } from "../hooks/useGraph";

export interface GraphNode extends NodeModel {
  data: {
    label?: string;
    path?: string;
    avatar?: string;
    color?: string;
    nodeType?: string;
    cluster?: string;
    colorMap?: string[];
    [key: string]: unknown;
  };
}

export interface GraphEdge extends EdgeModel {
  data: {
    label?: string;
    color?: string;
    edgeType?: string;
    weight?: number;
    [key: string]: unknown;
  };
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  combos?: GraphNode[];
}

export interface GraphProps extends ChildrenProp {
  data?: GraphData;
  graphRef?: RefObject<ReturnType<typeof useGraph>>;

  /**
   * { [nodeType | edgeType]: color }
   */
  colorMap?: KeyValue;

  defaultLayout?: "auto" | "radial" | "circular" | "grid" | "hierarchy";

  readOnly?: boolean;

  onNodeExpand?: (nodes: NodeModel[]) => Promise<GraphData>;

  onClear?: () => void;
}
