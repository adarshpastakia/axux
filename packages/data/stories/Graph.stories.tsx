import { Meta, StoryObj } from "@storybook/react";
import { AxGraph } from "../src";

import { ID } from "@antv/g6";
import { AxButton, AxHeader, AxSection } from "@axux/core";
import { faker } from "@faker-js/faker";
import {
  mdiAccount,
  mdiAccountTieHat,
  mdiAlien,
  mdiBank,
  mdiBusStop,
  mdiCar,
  mdiHome,
} from "@mdi/js";
import { useState } from "react";
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

const loadMore = (nodeId: ID) => {
  const nodes = new Array(10).fill(0).map((_, idx) => ({
    id: `${nodeId}--node-${faker.commerce.product()}`,
    data: makeNode(),
  }));
  return {
    nodes,
    edges: nodes.map((node) => ({
      id: `${nodeId}--edge-${node.id}`,
      source: nodeId,
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
    })),
  };
};

export const Example: Story = {
  render: (args) => {
    const [data, setData] = useState(graphJson);
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
              onNodeExpand={(node) => Promise.resolve(loadMore(node[0].id))}
            >
              <AxGraph.Toolbar>
                <AxGraph.ActionZoom />
                <AxGraph.ActionGroup>
                  <AxGraph.ActionBrush />
                  <AxGraph.ActionExpand />
                  <AxGraph.ActionDelete />
                  <AxGraph.ActionClear />
                </AxGraph.ActionGroup>
                <AxGraph.ActionLayout />
              </AxGraph.Toolbar>
              <AxGraph.Canvas />
            </AxGraph>
          </AxSection>
        </div>
      </div>
    );
  },
  args: {
    defaultLayout: "circular",
    colorMap: {
      "node-a": "#d946ef",
      "node-b": "#6366f1",
      "node-c": "#4d7c0f",
      "edge-a": "#059669",
      "edge-b": "#2563eb",
      "edge-c": "#65a30d",
    },
  },
};
