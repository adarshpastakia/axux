// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { AxAvatar } from "../../src";
import { AvatarProps } from "../../src/icons/Avatar";

const Template: Story<AvatarProps> = (props) => <AxAvatar {...props} />;

export const BasicStory = Template.bind({});
BasicStory.args = {
  size: "lg",
  title: "Lister of Smeg"
};

export const IconStory = Template.bind({});
IconStory.args = {
  size: "lg",
  title: "Lister of Smeg",
  icon: "mdi mdi-account"
};

export const ImageStory = Template.bind({});
ImageStory.args = {
  size: "lg",
  title: "Lister of Smeg",
  image: "https://picsum.photos/id/515/200"
};

export default { title: "Example/Avatar", component: AxAvatar };
