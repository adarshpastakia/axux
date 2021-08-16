// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { AxIcon } from "../../src";
import { IconProps } from "../../src/icons/Icon";

const Template: Story<IconProps> = (props) => <AxIcon {...props} />;

export const IconStory = Template.bind({});
IconStory.args = {
  icon: "mdi mdi-calendar"
};

export default { title: "Example/Icon", component: AxIcon };
