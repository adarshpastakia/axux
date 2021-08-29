// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxPage, AxSection, AxViewport } from "@axux/core";
import { Countries } from "@axux/utilities";
import { Country } from "@axux/utilities/dist/_countries";
import { Story } from "@storybook/react";
import { useMemo } from "react";
import { AxTreePanel } from "../../src";
import { TreeNode, TreePanelProps } from "../../src/tree/types";

const Template: Story<TreePanelProps> = (props) => {
  const data = useMemo<TreeNode[]>(() => {
    const grouped = Countries.list.reduce<KeyValue<Country[]>>((g, c) => {
      if (!(c.continent in g)) {
        g[c.continent] = [];
      }
      g[c.continent].push(c);
      return g;
    }, {});

    return [
      { id: "empty", label: "Empty node", isLeaf: false, children: [] },
      ...Object.entries(grouped).map<TreeNode>(([group, list]) => ({
        id: group,
        label: group,
        isLeaf: false,
        children: list.map<TreeNode>((c) => ({
          isLeaf: true,
          id: c.iso2,
          label: c.name,
          badge: c.tld,
          icon: <span>{c.emoji}</span>
        }))
      }))
    ];
  }, []);
  return (
    <AxViewport>
      <AxPage>
        <AxSection.Side width="24rem" isResizeable>
          <AxTreePanel {...props} data={data} />
        </AxSection.Side>
      </AxPage>
    </AxViewport>
  );
};

export const TreeStory = Template.bind({});
TreeStory.args = { isCheckable: true, checkLevel: 1 };

export default { title: "Example/Tree", component: AxTreePanel };
