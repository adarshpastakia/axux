import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.File,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const File: StoryObj<typeof AxField.File> = {
  render: (args) => {
    return <AxField.File {...args} width="30rem" />;
  },
  args: {
    label: "File input",
    allowClear: true,
    placeholder: "File input...",
  },
};
