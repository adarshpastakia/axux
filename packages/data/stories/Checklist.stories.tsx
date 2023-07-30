import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxCheckList } from "../src";

const meta: Meta<typeof AxCheckList> = {
  component: AxCheckList,
  title: "@data/CheckList",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxCheckList>;

export const Example: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <AxCheckList {...args} />
    </div>
  ),
  args: {
    items: [
      { id: "key1", label: faker.commerce.product() },
      { id: "key2", label: faker.commerce.product() },
      { id: "key3", label: faker.commerce.product() },
      { id: "key4", label: faker.commerce.product() },
      { id: "key5", label: faker.commerce.product() },
      { id: "key6", label: faker.commerce.product() },
      { id: "key7", label: faker.commerce.product() },
    ],
  },
};
