import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Text,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Text: StoryObj<typeof AxField.Text> = {
  render: (args) => {
    return <AxField.Text {...args} width="30rem" />;
  },
  args: {
    label: "Text input",
    value: "Sample text",
    allowClear: true,
    placeholder: "Text input...",
  },
};
