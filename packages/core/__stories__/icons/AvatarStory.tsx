// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { StateLabel } from "../../../../storybook/components";
import { AxAvatar, AxFlexBox } from "../../src";
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

export const AvatarSizes: Story<Omit<AvatarProps, "size">> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row>
      {[
        ["sm", "Small"],
        ["default", "Default"],
        ["md", "Medium"],
        ["lg", "Large"],
        ["xl", "XLarge"],
        [48, "Pixels"],
        ["5rem", "Rem"]
      ].map(([size, label]: AnyObject) => (
        <AxFlexBox.Col flex="auto" key={size}>
          <StateLabel>{label}</StateLabel>
          <AxAvatar {...props} size={size} />
        </AxFlexBox.Col>
      ))}
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const SizeStory = AvatarSizes.bind({});
ImageStory.args = {
  icon: "mdi mdi-account"
};

export default { title: "Example/Avatar", component: AxAvatar };
