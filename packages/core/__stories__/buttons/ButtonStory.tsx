// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { mdiBell } from "@mdi/js";
import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { AxButton } from "../../src";
import { ButtonProps } from "../../src/buttons/Button";

const Template: Story<PropsWithChildren<ButtonProps>> = (props) => <AxButton {...props} />;

export const ButtonStory = Template.bind({});
ButtonStory.args = {
  children: "Button"
};

export const WithIconStory = Template.bind({});
WithIconStory.args = {
  icon: "mdi mdi-bell",
  children: "Button"
};

export const OnlyIconStory = Template.bind({});
OnlyIconStory.args = {
  icon: mdiBell
};

export const WithTooltipStory = Template.bind({});
WithTooltipStory.args = {
  children: "Button",
  tooltip: {
    placement: "bottom",
    content: "Test tooltip"
  }
};

export const WithBadgeStory = Template.bind({});
WithBadgeStory.args = {
  children: "Button",
  badge: {
    color: "danger",
    value: 9
  }
};

export default { title: "Example/Button", component: AxButton };
