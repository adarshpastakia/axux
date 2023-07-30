import type { Meta, StoryObj } from "@storybook/react";
import { AxRangePanel } from "../src";

const meta: Meta<typeof AxRangePanel> = {
  component: AxRangePanel,
  title: "@date/RangePanel",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: "presets" },
  },
};

export default meta;
type Story = StoryObj<typeof AxRangePanel>;

export const Example: Story = {
  render: (args) => <AxRangePanel {...args} />,
  args: {
    showHijriToggle: true,
  },
};
