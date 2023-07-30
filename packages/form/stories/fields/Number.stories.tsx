import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Number,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Number: StoryObj<typeof AxField.Number> = {
  render: (args) => {
    return <AxField.Number {...args} width="30rem" />;
  },
  args: {
    label: "Number input",
    value: 42,
    allowClear: true,
    placeholder: "Number input...",
  },
};
