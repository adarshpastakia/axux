// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { StateLabel } from "../../../../storybook/components";
import { PALETTE } from "../../../../storybook/stylings/theming-items";
import { AxFlexBox, AxHotKeyLabel, COLOR } from "../../src";
import { AxTag, TagProps } from "../../src/buttons/Tag";

const Template: Story<PropsWithChildren<TagProps>> = (props) => <AxTag {...props} />;

export const TagSizes: Story<Omit<TagProps, "size">> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row>
      {[
        ["sm", "Small"],
        ["default", "Default"],
        ["md", "Medium"],
        ["lg", "Large"]
      ].map(([size, label]: AnyObject) => (
        <AxFlexBox.Col flex="auto" key={size}>
          <StateLabel>{label}</StateLabel>
          <AxTag {...props} size={size}>
            Tag!
          </AxTag>
        </AxFlexBox.Col>
      ))}
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const Hotkeys: Story = () => (
  <AxFlexBox>
    <AxFlexBox.Row>
      {[
        "ctrl+alt+shift+w",
        "shift+tab",
        "alt+delete",
        "ctrl+space",
        "esc",
        "enter",
        "ctrl+up",
        "ctrl+right"
      ].map((key) => (
        <AxFlexBox.Col key={key} flex="auto">
          <AxHotKeyLabel keyCombo={key} />
        </AxFlexBox.Col>
      ))}
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const TagThemes: Story<PropsWithChildren<TagProps>> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row>
      {Object.values(COLOR).map((color) => (
        <AxFlexBox.Col flex="auto" key={color}>
          <AxTag icon="mdi mdi-bell" {...props} color={color}>
            {color}
          </AxTag>
        </AxFlexBox.Col>
      ))}
    </AxFlexBox.Row>
    <AxFlexBox.Row>
      {Object.values(PALETTE).map((color) => (
        <AxFlexBox.Col flex="auto" key={color}>
          <AxTag icon="mdi mdi-bell" {...props} color={color}>
            {color}
          </AxTag>
        </AxFlexBox.Col>
      ))}
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const TagStory = Template.bind({});
TagStory.args = {
  children: "Tag"
};

export const WithIconStory = Template.bind({});
WithIconStory.args = {
  icon: "mdi mdi-bell",
  children: "Icon"
};

export const WithTooltipStory = Template.bind({});
WithTooltipStory.args = {
  children: "Tooltip",
  tooltip: {
    placement: "bottom",
    content: "Test tooltip"
  }
};

export const WithBadgeStory = Template.bind({});
WithBadgeStory.args = {
  children: "Badge",
  badge: 9
};

export const Removable = Template.bind({});
Removable.args = {
  children: "Tag!",
  onRemove: () => action("onRemove")() + "" + alert("Tag remove")
};

export const Clickable = Template.bind({});
Clickable.args = {
  children: "Tag!",
  onClick: () => action("onClick")() + "" + alert("Tag click")
};

export default { title: "Example/Tag", component: AxTag };
