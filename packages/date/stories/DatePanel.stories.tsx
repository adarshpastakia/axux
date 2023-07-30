import type { Meta, StoryObj } from "@storybook/react";
import { AxDatePanel } from "../src";

const meta: Meta<typeof AxDatePanel> = {
  component: AxDatePanel,
  title: "@date/DatePanel",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: "presets" },
  },
};

export default meta;
type Story = StoryObj<typeof AxDatePanel>;

export const Example: Story = {
  render: (args) => <AxDatePanel {...args} />,
  args: {
    showHijriToggle: true,
  },
};
