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
    label: "North",
    isLeaf: false,
    children: [
      {
        label: "East",
        isLeaf: false,
        children: [
          { label: "Some1", isLeaf: false, id: "north-east" },
          { label: "Some2", isLeaf: false, id: "north-east" },
        ],
      },
      {
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
    label: "South",
    isLeaf: false,
    children: [
      {
        label: "East",
        isLeaf: false,
        children: [
          { label: "Some1", isLeaf: false, id: "south-east" },
          { label: "Some2", isLeaf: false, id: "south-east" },
        ],
      },
      {
        label: "West",
        isLeaf: false,
        children: [
          { label: "Some1", isLeaf: false, id: "south-west" },
          { label: "Some2", isLeaf: false, id: "south-west" },
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

export const TreeStory: ComponentStory<typeof AxTreePanel> = (props) => {
  const loadMore = useCallback((id: string) => {
    if (id === "north-west1") return undefined;
    if (id === "north-west2") return Promise.resolve([]);
    return new Promise<TreeNode[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            label: "Remote Leaf",
            isLeaf: false,
            children: [
              { label: "Some1", isLeaf: false, id: "remote-east" },
              { label: "Some2", isLeaf: false, id: "remote-east" },
            ],
          },
          {
            label: "Remote Leaf",
            isLeaf: false,
            children: [
              { label: "Some1", isLeaf: false, id: "remote-west" },
              { label: "Some2", isLeaf: false, id: "remote-west" },
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

export default { title: "AxTreePanel", component: AxTreePanel };
