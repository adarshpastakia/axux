import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxMeter } from "../../src";

const meta: Meta<typeof AxMeter> = {
  component: AxMeter,
  title: "@core/Components/Meter",
  tags: ["autodocs"],
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof AxMeter>;

export const Example: Story = {
  render: (args) => <AxMeter {...args} />,
  args: { className: "w-72", value: 81 },
};
