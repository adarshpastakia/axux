// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxButton, AxContent, AxContextMenu, AxMenu, AxPanel, AxText } from "../../src";
import { PanelProps } from "../../src/panels/Panel";
import { ElementProps } from "../../src/types";

const contextItems = [
  <AxMenu key="one">
    <AxMenu.Item label="Submenu" panelId="submenu" />
    <AxMenu.Item label="Test" />
  </AxMenu>,
  <AxMenu key="submenu" panelId="submenu" title="Submenu">
    <AxMenu.Item label="Test Next" />
  </AxMenu>
];

const Template: Story<PropsWithChildren<PanelProps>> = (props) => {
  return (
    <AxPanel {...props}>
      <AxContextMenu menu={contextItems}>
        <AxContent>Test right click</AxContent>
      </AxContextMenu>
    </AxPanel>
  );
};

export const PanelStory = Template.bind({});
PanelStory.args = {
  title: "My Panel",
  icon: "mdi mdi-bell",
  minHeight: 10,
  isLoading: false,
  isCollapsable: true,
  isExpandable: true,
  paper: true,
  onBack: undefined
};

const StackTemplate: Story<ElementProps> = (props) => (
  <AxPanel.Stack {...props}>
    <AxPanel paper height="10rem" title="Panel 1">
      <AxContent>
        <AxButton panelId="pan2">Next 2</AxButton>
      </AxContent>
    </AxPanel>
    <AxPanel paper panelId="pan2" height="10rem" title="Panel 2">
      <AxContent>
        <AxButton panelId="back">Back</AxButton>
        <AxButton panelId="pan3">Next 3</AxButton>
      </AxContent>
    </AxPanel>
    <AxPanel paper panelId="pan3" height="10rem" title="Panel 3">
      <AxContent>
        <AxText>Last panel</AxText>
      </AxContent>
    </AxPanel>
  </AxPanel.Stack>
);

export const StackStory = StackTemplate.bind({});
StackStory.args = {};

const GroupTemplate: Story<ElementProps> = (props) => (
  <AxPanel.Group accordion activePanel="pan1" {...props}>
    <AxPanel paper panelId="pan1" height="10rem" title="Panel 1">
      <AxContent>{LIPSUM.para}</AxContent>
    </AxPanel>
    <AxPanel paper panelId="pan2" height="10rem" title="Panel 2">
      <AxContent>{LIPSUM.para}</AxContent>
    </AxPanel>
    <AxPanel paper panelId="pan3" height="10rem" title="Panel 3">
      <AxContent>{LIPSUM.para}</AxContent>
    </AxPanel>
  </AxPanel.Group>
);

export const GroupStory = GroupTemplate.bind({});
GroupStory.args = {};

export default { title: "Example/Panel", component: AxPanel };
