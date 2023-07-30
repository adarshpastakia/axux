import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Password,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Password: StoryObj<typeof AxField.Password> = {
  render: (args) => {
    return <AxField.Password {...args} width="30rem" />;
  },
  args: {
    label: "Password input",
    showToggle: true,
    strength: 81,
    value: "S@mpl3",
    allowClear: true,
    placeholder: "Password input...",
  },
};
