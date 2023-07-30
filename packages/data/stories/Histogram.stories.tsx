import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxHistogram } from "../src";

const meta: Meta<typeof AxHistogram> = {
  component: AxHistogram,
  title: "@data/Histogram",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxHistogram>;

export const Example: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <AxHistogram {...args} />
    </div>
  ),
  args: {
    items: [
      {
        id: "key1",
        label: faker.commerce.product(),
        count: faker.number.int({ min: 18, max: 99 }),
      },
      {
        id: "key2",
        label: faker.commerce.product(),
        count: faker.number.int({ min: 18, max: 99 }),
      },
      {
        id: "key3",
        label: faker.commerce.product(),
        count: faker.number.int({ min: 18, max: 99 }),
      },
      {
        id: "key4",
        label: faker.commerce.product(),
        count: faker.number.int({ min: 18, max: 99 }),
      },
      {
        id: "key5",
        label: faker.commerce.product(),
        count: faker.number.int({ min: 18, max: 99 }),
      },
      {
        id: "key6",
        label: faker.commerce.product(),
        count: faker.number.int({ min: 18, max: 99 }),
      },
      {
        id: "key7",
        label: faker.commerce.product(),
        count: faker.number.int({ min: 18, max: 99 }),
      },
    ],
  },
};
