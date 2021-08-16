// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { AxTag, TagProps } from "../../src/buttons/Tag";

const Template: Story<PropsWithChildren<TagProps>> = (props) => <AxTag {...props} />;

export const TagStory = Template.bind({});
TagStory.args = {
  children: "Tag"
};

export const WithIconStory = Template.bind({});
WithIconStory.args = {
  icon: "mdi mdi-bell",
  children: "Tag"
};

export const WithTooltipStory = Template.bind({});
WithTooltipStory.args = {
  children: "Tag",
  tooltip: {
    placement: "bottom",
    content: "Test tooltip"
  }
};

export const WithBadgeStory = Template.bind({});
WithBadgeStory.args = {
  children: "Tag",
  badge: 9
};

export default { title: "Example/Tag", component: AxTag };
