// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxText } from "../../src";
import { TextProps } from "../../src/typography/Text";

const Template: Story<PropsWithChildren<TextProps>> = (props) => <AxText {...props} />;

export const TextStory = Template.bind({});
TextStory.args = {
  children: LIPSUM.para
};

export const SerifStory = Template.bind({});
SerifStory.args = {
  children: LIPSUM.para,
  className: "ax-text--dropcaps ax-align--justify",
  block: true,
  font: "serif"
};

export const ColorStory = Template.bind({});
ColorStory.args = {
  children: LIPSUM.para,
  className: "ax-text--indent-2 ax-align--justify ax-padding--sm",
  block: true,
  color: "secondary",
  bg: "lightest"
};

export default { title: "Example/Text", component: AxText };
