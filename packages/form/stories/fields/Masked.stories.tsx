import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Masked,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Masked: StoryObj<typeof AxField.Masked> = {
  render: (args) => {
    return <AxField.Masked {...args} width="30rem" />;
  },
  args: {
    label: "Masked input",
    value: "MASK-1248",
    mask: "MASK-9999",
    allowClear: true,
    placeholder: "Masked input...",
  },
};
