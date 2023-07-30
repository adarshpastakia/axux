import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxSuperDate } from "../src";

const meta: Meta<typeof AxSuperDate> = {
  component: AxSuperDate,
  title: "@date/SuperDate",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: "presets" },
  },
};

export default meta;
type Story = StoryObj<typeof AxSuperDate>;

export const Example: Story = {
  render: (args) => <AxSuperDate {...args} />,
  args: {
    showHijriToggle: true,
    presets: {
      "This month": "$month|$month",
      "Last month": "$month-1|$month-1",
      "This quarter": "$quarter|$quarter",
      "Last quarter": "$quarter-1|$quarter-1",
      "This year": "$year|$year",
      "Last year": "$year-1|$year-1",
      "Last 1 year": "$year-1|$now",
      "Last 2 year": "$year-2|$now",
      "Last 5 year": "$year-5|$now",
    },
  },
};
