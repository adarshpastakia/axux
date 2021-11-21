// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { AxField } from "../../src";
import { RangeFieldProps } from "../../src/field/Range";
import { SliderFieldProps } from "../../src/field/Slider";

const Template: Story<PropsWithChildren<SliderFieldProps>> = (props) => (
  <AxField.Slider {...props} />
);

export const SliderStory = Template.bind({});
SliderStory.args = {
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  width: "20em",
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

const RangeTemplate: Story<PropsWithChildren<RangeFieldProps>> = (props) => (
  <AxField.Range {...props} />
);

export const RangeStory = RangeTemplate.bind({});
RangeStory.args = {
  min: 0,
  max: 100,
  step: 1,
  value: [20, 75],
  width: "20em",
  label: "Range slider"
};

export default { title: "Example/Slider", component: AxField.Slider };
