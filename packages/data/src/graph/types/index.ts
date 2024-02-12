/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type EdgeModel, type NodeModel } from "@antv/g6";

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
}

export interface GraphProps {
  data: GraphData;

  /**
   * { [nodeType | edgeType]: color }
   */
  colorMap?: KeyValue;

  defaultLayout?: "auto" | "radial" | "circular" | "grid" | "hierarchy";

  showLegend?: boolean;
  showToolbar?: boolean;
  allowInteraction?: boolean;

  onNodeExpand?: (nodes: NodeModel[]) => Promise<GraphData>;
}
