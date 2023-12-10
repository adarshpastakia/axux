import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxCallout } from "../../src";

const meta: Meta<typeof AxCallout> = {
  component: AxCallout,
  title: "@core/Components/Callout",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxCallout>;

export const Example: Story = {
  render: (args) => <AxCallout {...args} />,
  args: {
    className: "w-96",
    title: faker.commerce.productName(),
    icon: "mdi mdi-alert",
    children: <p>{faker.lorem.paragraph()}</p>,
  },
};
