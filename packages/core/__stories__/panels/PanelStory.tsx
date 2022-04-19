// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { mdiBell } from "@mdi/js";
import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxBox, AxButton, AxContent, AxContextMenu, AxMenu, AxPanel, AxText } from "../../src";
import { PanelProps } from "../../src/panels/Panel";
import { ElementProps } from "../../src/types";
import { PanelGroupProps } from "../../src/panels/PanelGroup";

const contextItems = [
  <AxMenu key="one" withIcons>
    <AxMenu.Item icon={mdiBell} label="Submenu" panelId="submenu" />
    <AxMenu.Item label="Test" />
  </AxMenu>,
  <AxMenu key="submenu" panelId="submenu" title="Submenu">
    <AxMenu.Item label="Test Next" />
  </AxMenu>
];

const Template: Story<PropsWithChildren<PanelProps>> = (props) => {
  return (
    <AxBox width="32rem">
      <AxPanel {...props}>
        <AxContextMenu menu={contextItems}>
          <AxContent>Test right click</AxContent>
        </AxContextMenu>
      </AxPanel>
    </AxBox>
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
  <AxBox width="32rem">
    <AxPanel.Stack {...props}>
      <AxPanel paper height="20rem" title="Panel 1">
        <AxContent>
          <AxButton panelId="pan2">Next 2</AxButton>
        </AxContent>
      </AxPanel>
      <AxPanel paper panelId="pan2" height="20rem" title="Panel 2">
        <AxContent>
          <AxButton panelId="back">Back</AxButton>
          <AxButton panelId="pan3">Next 3</AxButton>
        </AxContent>
      </AxPanel>
      <AxPanel paper panelId="pan3" height="20rem" title="Panel 3">
        <AxContent>
          <AxText>Last panel</AxText>
        </AxContent>
      </AxPanel>
    </AxPanel.Stack>
  </AxBox>
);

export const StackStory = StackTemplate.bind({});
StackStory.args = {};

const GroupTemplate: Story<PanelGroupProps> = (props) => (
  <AxBox width="32rem">
    <AxPanel.Group accordion activePanel="pan1" {...props}>
      <AxPanel paper panelId="pan1" height="20rem" title="Panel 1">
        <AxContent>{LIPSUM.para}</AxContent>
      </AxPanel>
      <AxPanel paper panelId="pan2" height="20rem" title="Panel 2">
        <AxContent>{LIPSUM.para}</AxContent>
      </AxPanel>
      <AxPanel paper panelId="pan3" height="20rem" title="Panel 3">
        <AxContent>{LIPSUM.para}</AxContent>
      </AxPanel>
    </AxPanel.Group>
  </AxBox>
);

export const GroupStory = GroupTemplate.bind({});
GroupStory.args = {};

export default { title: "Example/Panel", component: AxPanel };
