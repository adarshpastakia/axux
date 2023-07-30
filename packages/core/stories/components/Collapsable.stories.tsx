import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxCollapsable, AxContent } from "../../src";

const meta: Meta<typeof AxCollapsable> = {
  component: AxCollapsable,
  title: "@core/Components/Collapsable",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxCollapsable>;

export const Example: Story = {
  render: (args) => <AxCollapsable {...args} />,
  args: {
    className: "w-96",
    children: [
      <p key="title">{faker.commerce.productName()}</p>,
      <AxContent key="body">{faker.lorem.paragraph()}</AxContent>,
    ],
  },
};
