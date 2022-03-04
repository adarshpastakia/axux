// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxContent, AxPage, AxPanel, AxSection, AxViewport } from "@axux/core";
import { Countries } from "@axux/utilities";
import { Country } from "@axux/utilities/dist/_countries";
import { Story } from "@storybook/react";
import { useMemo, useState } from "react";
import { AxCheckList, AxTreePanel } from "../../src";
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
          icon: c.emoji
        }))
      }))
    ];
  }, []);

  const items = useMemo(
    () =>
      new Array(20)
        .fill(0)
        .map((_, i) => ({
          id: `key${i}`,
          label: `Item ${i}`,
          count: Math.floor(Math.random() * 99)
        }))
        .sort((a, b) => (a.count > b.count ? -1 : 1))
        .map((item) => ({ ...item, disabled: item.count < 20, badge: item.count })),
    []
  );

  const [selected, setSelected] = useState<AnyObject>([]);
  const [selection, setSelection] = useState<AnyObject>({ include: [], exclude: [] });
  return (
    <AxViewport>
      <AxPage>
        <AxSection.Side width="24rem" isResizeable>
          <AxTreePanel {...props} data={data} />
        </AxSection.Side>
        <AxSection.Side end width="24rem">
          <AxPanel.Group>
            <AxPanel panelId="check" title="Check List" isCollapsable>
              <AxContent padding="none">
                <AxCheckList onChange={setSelected} selected={selected} items={items} />
              </AxContent>
            </AxPanel>
            <AxPanel panelId="toggle" title="Toggle List" isCollapsable>
              <AxContent padding="none">
                <AxCheckList
                  allowNegate
                  onChange={setSelection}
                  selected={selection}
                  items={items}
                />
              </AxContent>
            </AxPanel>
          </AxPanel.Group>
        </AxSection.Side>
      </AxPage>
    </AxViewport>
  );
};

export const TreeStory = Template.bind({});
TreeStory.args = { isCheckable: true, checkLevel: 1 };

export default { title: "Example/Tree", component: AxTreePanel };
