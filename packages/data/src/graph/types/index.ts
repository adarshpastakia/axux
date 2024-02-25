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

export interface GraphNode<N extends KeyValue = KeyValue> extends NodeModel {
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
  } & N;
}

export interface GraphEdge<E extends KeyValue = KeyValue> extends EdgeModel {
  data: {
    label?: string;
    color?: string;
    edgeType?: string;
    weight?: number;
    strokeType?: "dashed" | "dotted";
    [key: string]: unknown;
  } & E;
}

export interface GraphData<
  N extends KeyValue = KeyValue,
  E extends KeyValue = KeyValue
> {
  nodes: Array<
    GraphNode<N> & {
      isGroup?: true;
      originalEdges?: Array<GraphEdge<N>>;
    }
  >;
  edges: Array<GraphEdge<E>>;
}

export type GraphRef<N extends KeyValue> = ReturnType<typeof useGraph<N>>;
export type GraphInstance = InstanceType<typeof Graph>;

export interface StyleObject {
  fill?: string;
  color?: string;
  label?: string;
  iconPath?: string;
  shape?: "circle" | "rect" | "diamond";
  strokeType?: "dashed" | "dotted";
}

export interface GraphProps<
  N extends KeyValue = KeyValue,
  E extends KeyValue = KeyValue
> extends ChildrenProp {
  data?: GraphData<N, E>;
  graphRef?: Ref<GraphRef<N> | undefined>;

  /**
   * { [nodeType | edgeType]: { icon, color, shape, strokeType } }
   */
  styleMap?: Partial<{
    defaultNode: StyleObject;
    defaultEdge: StyleObject;
    [key: string]: StyleObject;
  }>;

  defaultLayout?: "auto" | "radial" | "circular" | "grid" | "hierarchy";

  readOnly?: boolean;
  useWorker?: boolean;

  onNodeExpand?: (nodes: Array<GraphNode<N>>) => Promise<GraphData<N, E>>;
  onNodeSelected?: (nodes: Array<GraphNode<N>>) => void;

  onContextMenu?: (props: { type: "node" | "edge" | "canvas" }) => Array<
    Array<{
      id: string;
      label: string;
      className?: string;
      isDisabled?: boolean;
      handler: (nodes: Array<GraphNode<N>>) => void;
    }>
  >;

  onMergeNodes?: (subGraph: {
    nodes: Array<GraphNode<N>>;
    edges: Array<GraphEdge<N>>;
  }) => { node: GraphNode<N>; edges: Array<GraphEdge<N>> };

  renderDetail?: (props: {
    item: GraphNode<N>;
    style?: StyleObject;
  }) => JSX.Element;

  renderTooltip?: (props: {
    item:
      | (GraphNode<N> & { source?: never; target?: never })
      | (GraphEdge<E> & {
          source?: GraphNode<N> & { style?: StyleObject };
          target?: GraphNode<N> & { style?: StyleObject };
        });
    itemType: "node" | "edge" | "combo";
    style?: StyleObject;
  }) => JSX.Element;

  onDataLoad?: (graph: GraphInstance) => void;
  onClear?: () => void;
}
