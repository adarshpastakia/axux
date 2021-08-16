// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxHeading } from "../../src";
import { HeadingProps } from "../../src/typography/Heading";

const Template: Story<PropsWithChildren<HeadingProps>> = (props) => <AxHeading {...props} />;

export const HeadingStory = Template.bind({});
HeadingStory.args = {
  children: LIPSUM.text,
  level: 1
};

export const DisplayStory = Template.bind({});
DisplayStory.args = {
  children: LIPSUM.text,
  level: 1,
  forDisplay: true
};

export const SerifStory = Template.bind({});
SerifStory.args = {
  children: LIPSUM.text,
  font: "serif"
};

export const ColorStory = Template.bind({});
ColorStory.args = {
  children: LIPSUM.text,
  bg: "lightest",
  color: "secondary",
  className: "ax-padding--sm"
};

export default { title: "Example/Heading", component: AxHeading };
