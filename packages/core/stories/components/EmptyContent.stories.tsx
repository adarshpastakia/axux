import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxButton, AxContent } from "../../src";

const meta: Meta<typeof AxContent.Empty> = {
  component: AxContent.Empty,
  title: "@core/Components/EmptyContent",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: ["actions"] },
  },
};

export default meta;
type Story = StoryObj<typeof AxContent.Empty>;

export const Example: Story = {
  render: (args) => <AxContent.Empty {...args} />,
  args: {
    className: "w-96 text-info",
    title: faker.company.name(),
    message: faker.company.catchPhrase(),
    actions: [<AxButton variant="link">Action</AxButton>],
  },
};
