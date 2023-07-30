import type { Meta, StoryObj } from "@storybook/react";
import { AxDateDisplay } from "../src";

const meta: Meta<typeof AxDateDisplay> = {
  component: AxDateDisplay,
  title: "@date/DateDisplay",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: "presets" },
  },
};

export default meta;
type Story = StoryObj<typeof AxDateDisplay>;

export const Example: Story = {
  render: (args) => <AxDateDisplay {...args} />,
  args: {
    date: "2023-04-18T12:48:24.999Z",
  },
};
