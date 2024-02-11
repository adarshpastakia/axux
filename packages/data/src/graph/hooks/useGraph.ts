/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import G6, { type GraphData } from "@antv/g6";
import { useIsDark } from "@axux/core";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeSvg, shadeColor } from "../utils";

const DEFAULT_NODE_COLOR = "#0ea5e9";
const DEFAULT_EDGE_COLOR = "#64748b";

export const useGraph = (container: HTMLDivElement | null) => {
  const [graph, setGraph] = useState<InstanceType<typeof G6.Graph>>();
  const { t } = useTranslation("graph");
  const isDark = useIsDark();

  useEffect(() => {
    if (container) {
      console.log("create graph");
      const ExtGraph = G6.extend(G6.Graph, {
        nodes: {
          "donut-node": G6.Extensions.DonutNode,
        },
        edges: {
          "quadratic-edge": G6.Extensions.QuadraticEdge,
        },
        layouts: {
          "radial-layout": G6.Extensions.RadialLayout,
        },
        transforms: {
          "process-parallel-edges": G6.Extensions.ProcessParallelEdges,
        },
        plugins: {
          legend: G6.Extensions.Legend,
        },
      } as AnyObject);
      const graph = new ExtGraph({
        container,
        renderer: "canvas",
        modes: {
          default: ["drag-canvas", "click-select", "zoom-canvas"],
        },
        plugins: [
          {
            key: "default-legend",
            type: "legend",
            size: "fit-content",
            node: {
              enable: true,
              cols: 4,
              padding: [20, 20],
              title: "node-legend",
              typeField: "nodeType",
              labelFormatter: (model: string) => t(`node.${model}`, model),
            },
            edge: {
              enable: true,
              cols: 4,
              padding: [10, 20],
              title: "edge-legend",
              typeField: "edgeType",
              labelFormatter: (model: string) => t(`node.${model}`, model),
            },
          },
        ],
        transforms: [
          {
            type: "process-parallel-edges",
            multiEdgeType: "quadratic-edge",
          } as AnyObject,
        ],
        node: {
          type: "donut-node",
          keyShape: {
            r: 32,
            lineWidth: 6,
            stroke: {
              fields: ["id", "color"],
              formatter: (model: KeyValue) =>
                model.data.color ?? DEFAULT_NODE_COLOR,
            },
            fill: {
              fields: ["id", "color"],
              formatter: (model: KeyValue) =>
                shadeColor(
                  (model.data.color as string) ?? DEFAULT_NODE_COLOR,
                  50
                ),
            },
          },
          labelShape: {
            text: {
              fields: ["label"],
              formatter: (model: KeyValue) => model.data.label,
            },
            dy: 4,
            fontSize: 12,
            maxWidth: "110%",
            position: "bottom",
          },
          // @ts-expect-error ignore
          labelBackgroundShape: {},
          iconShape: {
            width: 32,
            height: 32,
            src: {
              fields: ["id", "path"],
              formatter: (model: KeyValue) => makeSvg(model.data.path),
            },
          },
          donutShapes: {
            innerSize: 0.7,
            attrs: {
              fields: ["id", "colorMap"],
              formatter: (model: KeyValue) =>
                model.data.colorMap?.map(
                  () => 100 / model.data.colorMap.length
                ),
            },
            colorMap: {
              fields: ["id", "colorMap"],
              formatter: (model: KeyValue) => model.data.colorMap?.sort(),
            },
          },
          animates: {
            update: [
              {
                fields: ["opacity"],
                shapeId: "haloShape",
                states: ["selected", "active"],
              },
              {
                fields: ["lineWidth"],
                shapeId: "keyShape",
                states: ["selected", "active"],
              },
            ],
          },
        },
        nodeState: {
          selected: {
            keyShape: {
              stroke: "#f00",
            },
          },
        },
        edge: {
          keyShape: {
            lineWidth: 4,
            stroke: {
              fields: ["id", "color"],
              formatter: (model: KeyValue) =>
                model.data.color ?? DEFAULT_EDGE_COLOR,
            },
          },
        },
      });

      const ob = new ResizeObserver(() => {
        // graph.set(container.offsetWidth, container.offsetHeight);
        // graph.updateLayout();
        graph.setSize([container.offsetWidth, container.offsetHeight]);
        void graph.fitView({
          padding: 24,
        });
      });
      ob.observe(container);

      setGraph(graph as AnyObject);

      return () => {
        ob.disconnect();
        graph.destroy();
      };
    }
  }, [container]);

  useEffect(() => {
    graph?.updateTheme({
      type: "spec",
      // @ts-expect-error ignore
      base: isDark ? "dark" : "light",
    });
  }, [isDark, graph]);

  const loadData = useCallback(
    (data: GraphData) => {
      void graph?.read(data).then(() => {
        void graph.fitView({
          padding: 24,
        });
      });
    },
    [graph]
  );

  return { ref: graph, loadData };
};
