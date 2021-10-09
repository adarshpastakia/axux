// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { SliderFieldProps } from "../../dist/field/Slider";
import { AxField } from "../../src";

const Template: Story<PropsWithChildren<SliderFieldProps>> = (props) => (
  <AxField.Slider {...props} />
);

export const SliderStory = Template.bind({});
SliderStory.args = {
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  vertical: true,
  label: "Numerical slider"
};

export const WithLabelStory = Template.bind({});
WithLabelStory.args = {
  ...SliderStory.args,
  showLabel: true
};

export const WithValueLabelStory = Template.bind({});
WithValueLabelStory.args = {
  ...SliderStory.args,
  showLabel: true,
  showValue: true
};

export const WithTicksStory = Template.bind({});
WithTicksStory.args = {
  ...SliderStory.args,
  showLabel: true,
  showValue: true,
  showTicks: true
};

export default { title: "Example/Slider", component: AxField.Slider };
