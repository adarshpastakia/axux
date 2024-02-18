/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type EdgeModel, type Graph, type NodeModel } from "@antv/g6";
import { type ChildrenProp } from "@axux/core/dist/types";
import { type Ref } from "react";
import { type useGraph } from "../hooks/useGraph";

export interface GraphNode extends NodeModel {
  data: {
    label?: string;
    avatar?: string;
    iconPath?: string;
    fill?: string;
    color?: string;
    nodeType?: string;
    cluster?: string;
    colorMap?: string[];
    shape?: "circle" | "rect" | "diamond";
    strokeType?: "dashed" | "dotted";
    [key: string]: unknown;
  };
}

export interface GraphEdge extends EdgeModel {
  data: {
    label?: string;
    color?: string;
    edgeType?: string;
    weight?: number;
    strokeType?: "dashed" | "dotted";
    [key: string]: unknown;
  };
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  combos?: GraphNode[];
}

export type GraphRef = ReturnType<typeof useGraph>;
export type GraphInstance = InstanceType<typeof Graph>;

export interface GraphProps extends ChildrenProp {
  data?: GraphData;
  graphRef?: Ref<GraphRef | undefined>;

  /**
   * { [nodeType | edgeType]: { icon, color, shape, strokeType } }
   */
  styleMap?: KeyValue<{
    fill?: string;
    color?: string;
    label?: string;
    iconPath?: string;
    shape?: "circle" | "rect" | "diamond";
    strokeType?: "dashed" | "dotted";
  }>;

  defaultLayout?: "auto" | "radial" | "circular" | "grid" | "hierarchy";

  readOnly?: boolean;

  onNodeExpand?: (nodes: NodeModel[]) => Promise<GraphData>;

  onDataLoad?: (graph: GraphInstance) => void;
  onClear?: () => void;
}
