import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Color,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Color: StoryObj<typeof AxField.Color> = {
  render: (args) => {
    return <AxField.Color {...args} width="30rem" />;
  },
  args: {
    label: "Color input",
    value: "#2980B9",
    allowClear: true,
    placeholder: "Color input...",
  },
};
