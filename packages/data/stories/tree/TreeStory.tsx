/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAside, AxViewport } from "@axux/core";
import { Countries, Country } from "@axux/utilities";
import { ComponentStory } from "@storybook/react";
import { AxTreePanel } from "../../src";

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
          { label: "Some1", isLeaf: false },
          { label: "Some2", isLeaf: false },
        ],
      },
      {
        label: "West",
        isLeaf: false,
        children: [
          { label: "Some1", isLeaf: false },
          { label: "Some2", isLeaf: false },
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
          { label: "Some1", isLeaf: false },
          { label: "Some2", isLeaf: false },
        ],
      },
      {
        label: "West",
        isLeaf: false,
        children: [
          { label: "Some1", isLeaf: false },
          { label: "Some2", isLeaf: false },
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
  return (
    <AxViewport>
      <AxAside width="24rem" isResizeable>
        <AxTreePanel {...props} data={TreeData} />
      </AxAside>
    </AxViewport>
  );
};

export default { title: "AxTreePanel", component: AxTreePanel };
