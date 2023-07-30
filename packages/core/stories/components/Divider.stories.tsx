import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxDivider, AxContent } from "../../src";

const meta: Meta<typeof AxDivider> = {
  component: AxDivider,
  title: "@core/Components/Divider",
  tags: ["autodocs"],
  parameters: {
    controls: {
      exclude: "vertical",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AxDivider>;

export const Example: Story = {
  render: (args) => (
    <div className="w-[800px] px-16">
      <AxDivider {...args} vertical={false} />
    </div>
  ),
  args: {
    className: "text-primary",
    children: faker.company.buzzPhrase(),
  },
};

export const Vertical: Story = {
  render: (args) => (
    <div className="h-[400px] flex py-16">
      <AxDivider {...args} vertical={true} />
    </div>
  ),
  args: {
    color: "#e11d48",
  },
};
