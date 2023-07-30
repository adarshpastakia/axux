import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxCard, AxContent } from "../../src";

const meta: Meta<typeof AxCard> = {
  component: AxCard,
  title: "@core/Components/Card",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxCard>;

export const Example: Story = {
  render: (args) => <AxCard {...args} />,
  args: {
    className: "w-96",
    children: (
      <AxContent>
        <h1 className="text-xl">{faker.commerce.productName()}</h1>
        <p>{faker.lorem.paragraph()}</p>
      </AxContent>
    ),
  },
};
