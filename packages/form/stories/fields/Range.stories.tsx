import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Range,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Range: StoryObj<typeof AxField.Range> = {
  render: (args) => {
    return <AxField.Range {...args} width="30rem" />;
  },
  args: {
    label: "Range input",
    value: [18, 42],
    min: 1,
    max: 100,
  },
};
