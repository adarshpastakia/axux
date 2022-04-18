// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { AxContent } from "../../src";
import { EmptyContentProps } from "../../src/panels/EmptyContent";

const Template: Story<PropsWithChildren<EmptyContentProps>> = (props) => (
  <AxContent.Empty {...props} />
);

export const EmptyStory = Template.bind({});
EmptyStory.args = {
  title: "Callout Message",
  message: "This is a message describing empty content"
};

export const CustomEmptyStory = Template.bind({});
CustomEmptyStory.args = {
  title: "Callout Message",
  icon: "mdi mdi-bell",
  message: "This is a message describing empty content",
  actions: [
    <a className="ax-link" key="action">
      Action
    </a>
  ]
};

export default { title: "Example/Empty", component: AxContent.Empty };
