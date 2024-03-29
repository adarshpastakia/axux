import { Meta, StoryObj } from "@storybook/react";
import { AxGraph } from "../src";

import { AxButton, AxDivider, AxHeader, AxIcon, AxSection } from "@axux/core";
import { faker } from "@faker-js/faker";
import {
  mdiAccount,
  mdiAccountTieHat,
  mdiAlien,
  mdiBank,
  mdiBus,
  mdiBusStop,
  mdiCar,
  mdiHelpBox,
  mdiHome,
  mdiPlaneTrain,
  mdiRoutes,
} from "@mdi/js";
import { useState } from "react";
import { GraphData, GraphNode } from "../src/graph/types";
import graphJson from "./graph.json";

const meta: Meta<typeof AxGraph> = {
  component: AxGraph,
  title: "@data/Graph",
  tags: [],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "data" },
  },
};

export default meta;
type Story = StoryObj<typeof AxGraph>;

const makeNode = () => {
  const node: AnyObject = {
    nodeType: faker.helpers.arrayElement([
      "node-a",
      "node-b",
      "node-c",
      "node-d",
    ]),
    cluster: faker.helpers.arrayElement([
      "node-a",
      "node-b",
      "node-c",
      "node-d",
    ]),
    label: faker.company.name(),
    colorMap: new Array(faker.number.int({ min: 1, max: 9 }))
      .fill(0)
      .map(() => faker.color.rgb()),
  };
  if (faker.number.binary() === "1") {
    node.avatar = faker.image.url();
  } else {
    node.path = faker.helpers.arrayElement([
      mdiAccount,
      mdiAlien,
      mdiAccountTieHat,
      mdiBank,
      mdiHome,
      mdiBusStop,
      mdiCar,
    ]);
  }
  return node;
};

const circularData = () => {
  return {
    nodes: [
      {
        id: "node-0",
        data: {
          label: "Central Node",
          nodeType: "node-center",
        },
      },
      ...new Array(18).fill(0).map((_, idx) => ({
        id: `node-${idx + 1}`,
        data: makeNode(),
      })),
    ],
    edges: new Array(18).fill(0).map((_, idx) => ({
      id: `edge-${idx + 1}`,
      source: "node-0",
      target: `node-${idx + 1}`,
      data: {
        label: faker.company.buzzVerb(),
        dashed: faker.number.binary() === "1",
        edgeType: faker.helpers.arrayElement([
          "edge-a",
          "edge-b",
          "edge-c",
          "edge-d",
        ]),
      },
    })),
  };
};

const largeGraph = (count = 100) => {
  return {
    nodes: new Array(count).fill(0).map((_, idx) => ({
      id: `node-${idx + 1}`,
      data: makeNode(),
    })),
    edges: new Array(count * 2).fill(0).map((_, idx) => ({
      id: `edge-${idx + 1}`,
      source: `node-${faker.number.int({ min: 1, max: count })}`,
      target: `node-${faker.number.int({ min: 1, max: count })}`,
      data: {
        dashed: faker.number.binary() === "1",
        edgeType: faker.helpers.arrayElement([
          "edge-a",
          "edge-b",
          "edge-c",
          "edge-d",
        ]),
      },
    })),
  };
};

const loadMore = (list: GraphNode[]) => {
  const data: GraphData = {
    nodes: [],
    edges: [],
  };

  list.forEach(({ id }) => {
    const newNodes = new Array(10).fill(0).map((_, idx) => ({
      id: `${id}--node-${faker.commerce.product()}`,
      data: makeNode(),
    }));
    data.edges.push(
      ...newNodes.map((node) => ({
        id: `${id}--edge-${node.id}`,
        source: id,
        target: node.id,
        data: {
          dashed: faker.number.binary() === "1",
          edgeType: faker.helpers.arrayElement([
            "edge-a",
            "edge-b",
            "edge-c",
            "edge-d",
          ]),
        },
      }))
    );
    data.nodes.push(...newNodes);
  });
  return data;
};

export const Example: Story = {
  render: (args) => {
    const [data, setData] = useState<GraphData>();
    return (
      <div className="h-full min-h-[600px] grid overflow-hidden">
        <div className="w-full h-full ax-section grid-area-[unset]">
          <AxSection>
            <AxHeader className="gap-2 px-2 py-1">
              <AxButton onClick={() => setData(graphJson)}>
                Simple Graph
              </AxButton>
              <AxButton onClick={() => setData(circularData())}>
                Circular Graph
              </AxButton>
              <AxButton
                onClick={() => setTimeout(() => setData(largeGraph()), 100)}
              >
                Large Graph
              </AxButton>
            </AxHeader>
            <AxGraph
              {...args}
              data={data}
              onNodeExpand={(nodes) => Promise.resolve(loadMore(nodes))}
            >
              <AxGraph.Toolbar>
                <AxGraph.ActionZoom />
                <AxGraph.ActionGroup>
                  <AxGraph.ActionBrush />
                  <AxGraph.ActionHilight />
                  <AxGraph.ActionExpand />
                  <AxGraph.ActionDelete />
                  <AxGraph.ActionClear />
                </AxGraph.ActionGroup>
                <AxGraph.ActionLayout />
              </AxGraph.Toolbar>
            </AxGraph>
          </AxSection>
        </div>
      </div>
    );
  },
  args: {
    defaultLayout: "auto",
    styleMap: {
      "node-a": { color: "#d946ef", iconPath: mdiAccount },
      "node-b": { color: "#6366f1", iconPath: mdiAccount },
      "node-c": { color: "#4d7c0f", iconPath: mdiAccount },
      "edge-a": { color: "#059669", iconPath: mdiBus },
      "edge-b": { color: "#2563eb", iconPath: mdiCar },
      "edge-c": { color: "#65a30d", iconPath: mdiPlaneTrain },
      defaultNode: { color: "#64748b", iconPath: mdiHelpBox },
      defaultEdge: { color: "#6b7280", iconPath: mdiRoutes },
    },
    onContextMenu({ type }) {
      return [
        [{ id: "detail", label: "View detail", handler: () => undefined }],
      ];
    },
    renderTooltip({ item, itemType, style }) {
      return (
        <div
          className="bg-component rounded border-2 p-2 max-w-md min-w-64"
          style={{
            borderColor: style?.color,
          }}
        >
          <div className="flex gap-2 items-center">
            {(item.data?.avatar || style?.iconPath) && (
              <div
                className="rounded-full text-6xl p-2 leading-none overflow-hidden text-white"
                style={{
                  backgroundColor: style?.color,
                }}
              >
                <AxIcon icon={item.data?.avatar ?? style?.iconPath} />
              </div>
            )}
            <div className="flex-1">
              <div className="font-medium">{item.data?.label}</div>
              <div className="text-sm text-muted">{itemType}</div>
            </div>
          </div>
          <AxDivider size="xs" />
          {item.source && (
            <div className="flex gap-2 items-center mb-1">
              {(item.source.data?.avatar || item.source.style?.iconPath) && (
                <div
                  className="rounded-full text-lg p-1 leading-none overflow-hidden text-white"
                  style={{
                    backgroundColor: item.source.style?.color,
                  }}
                >
                  <AxIcon
                    icon={
                      item.source.data?.avatar ?? item.source.style?.iconPath
                    }
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="font-medium">{item.source.data?.label}</div>
              </div>
            </div>
          )}
          {item.target && (
            <div className="flex gap-2 items-center">
              {(item.target.data?.avatar || item.target.style?.iconPath) && (
                <div
                  className="rounded-full text-lg p-1 leading-none overflow-hidden text-white"
                  style={{
                    backgroundColor: item.target.style?.color,
                  }}
                >
                  <AxIcon
                    icon={
                      item.target.data?.avatar ?? item.target.style?.iconPath
                    }
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="font-medium">{item.target.data?.label}</div>
              </div>
            </div>
          )}
        </div>
      );
    },
  },
};
