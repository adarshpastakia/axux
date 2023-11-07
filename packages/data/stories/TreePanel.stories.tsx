import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxTreePanel, TreeNode } from "../src";
import { Countries, Country } from "@axux/utilities";

const meta: Meta<typeof AxTreePanel> = {
  component: AxTreePanel,
  title: "@data/TreePanel",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["onLoad", "data"] },
  },
};

export default meta;
type Story = StoryObj<typeof AxTreePanel>;

const grouped = Countries.list.reduce<KeyValue<Country[]>>((g, c) => {
  if (!(c.continent in g)) {
    g[c.continent] = [];
  }
  g[c.continent].push(c);
  return g;
}, {});

const TreeData = [
  {
    id: "north",
    label: "North",
    isLeaf: false,
    children: [
      {
        id: "north-east",
        label: "East",
        isLeaf: false,
        children: [
          { label: "Some1", isLeaf: false, id: "north-east1" },
          { label: "Some2", isLeaf: false, id: "north-east2" },
        ],
      },
      {
        id: "north-west",
        label: "West",
        isLeaf: false,
        children: [
          { label: "Some1", isLeaf: false, id: "north-west1" },
          { label: "Some2", isLeaf: false, id: "north-west2" },
        ],
      },
    ],
  },
  {
    id: "south",
    label: "South",
    isLeaf: false,
    children: [
      {
        id: "south-east",
        label: "East",
        isLeaf: false,
        children: [
          { label: "Some1", isLeaf: false, id: "south-east1" },
          { label: "Some2", isLeaf: false, id: "south-east2" },
        ],
      },
      {
        id: "south-west",
        label: "West",
        isLeaf: false,
        children: [
          { label: "Some1", isLeaf: false, id: "south-west1" },
          { label: "Some2", isLeaf: false, id: "south-west2" },
        ],
      },
    ],
  },
  ...Object.entries(grouped).map(([group, list]) => ({
    id: group,
    label: group,
    isLeaf: false,
    children: list.map((c) => ({
      isLeaf: true,
      id: c.iso2,
      label: `${c.name}`,
      badge: { icon: c.iso2 },
      icon: `flag ${c.iso2}`,
    })),
  })),
];

const loadMore = (id: string) => {
  if (id === "north-west1") return undefined;
  if (id === "north-west2") return Promise.resolve([]);
  return new Promise<TreeNode[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: id + "1",
          label: "Remote Leaf",
          isLeaf: false,
          children: [
            { label: "Some1", isLeaf: false, id: id + "remote-east1" },
            { label: "Some2", isLeaf: false, id: id + "remote-east2" },
          ],
        },
        {
          id: id + "2",
          label: "Remote Leaf",
          isLeaf: false,
          children: [
            { label: "Some1", isLeaf: false, id: id + "remote-west1" },
            { label: "Some2", isLeaf: false, id: id + "remote-west2" },
          ],
        },
      ]);
    }, 500);
  });
};

export const Example: Story = {
  render: (args) => (
    <div className="h-full min-h-[600px] grid overflow-hidden bg-base">
      <div className="w-[420px] h-full ax-section grid-area-[unset]">
        <AxTreePanel {...args} />
      </div>
    </div>
  ),
  args: {
    data: TreeData,
    onLoad: loadMore,
  },
};
