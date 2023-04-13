/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAside, AxViewport } from "@axux/core";
import { Countries, Country } from "@axux/utilities";
import { action } from "@storybook/addon-actions";
import { ComponentStory } from "@storybook/react";
import { useCallback } from "react";
import { AxTreePanel, TreeNode } from "../../src";

export const grouped = Countries.list.reduce<KeyValue<Country[]>>((g, c) => {
  if (!(c.continent in g)) {
    g[c.continent] = [];
  }
  g[c.continent].push(c);
  return g;
}, {});

export const TreeData = [
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

const TreeTemplate: ComponentStory<typeof AxTreePanel> = (props) => {
  const loadMore = useCallback((id: string) => {
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
  }, []);

  return (
    <AxViewport>
      <AxAside width="24rem" isResizeable>
        <AxTreePanel
          selected="AE"
          {...props}
          data={TreeData}
          onLoad={loadMore}
          onSelect={action("onSelect")}
        />
      </AxAside>
    </AxViewport>
  );
};

export const TreeStory = TreeTemplate.bind({});
TreeStory.args = {
  isSearchable: true,
};

export default { title: "AxTreePanel", component: AxTreePanel };
