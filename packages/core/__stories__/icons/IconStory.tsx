// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { AxFlexBox, AxIcon } from "../../src";
import { IconProps } from "../../src/icons/Icon";
import { StateLabel } from "../../../../storybook/components";
import { mdiBell } from "@mdi/js";

const Template: Story<IconProps> = (props) => <AxIcon {...props} />;

export const IconStory = Template.bind({});
IconStory.args = {
  size: "xxl",
  icon: "mdi mdi-calendar"
};
export const PathStory = Template.bind({});
PathStory.args = {
  size: "xxl",
  icon: mdiBell
};
export const ImageStory = Template.bind({});
ImageStory.args = {
  size: "xxl",
  icon: "https://picsum.photos/id/515/200"
};
export const RoundStory = Template.bind({});
RoundStory.args = {
  size: "xxl",
  round: true,
  icon: "mdi mdi-account"
};

export const IconSizes: Story<Omit<IconProps, "size">> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row>
      {[
        ["sm", "Small"],
        ["default", "Default"],
        ["md", "Medium"],
        ["lg", "Large"],
        ["xl", "XLarge"],
        [32, "Pixels"],
        ["3rem", "Rem"]
      ].map(([size, label]: AnyObject) => (
        <AxFlexBox.Col flex="auto" key={size}>
          <StateLabel>{label}</StateLabel>
          <AxIcon {...props} size={size} />
        </AxFlexBox.Col>
      ))}
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const SizeStory = IconSizes.bind({});
SizeStory.args = {
  icon: "mdi mdi-bell"
};

export default { title: "Example/Icon", component: AxIcon };
