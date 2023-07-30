import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Slider,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Slider: StoryObj<typeof AxField.Slider> = {
  render: (args) => {
    return <AxField.Slider {...args} width="30rem" />;
  },
  args: {
    label: "Slider input",
    value: 42,
    min: 1,
    max: 100,
  },
};
