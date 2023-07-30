import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxBreadcrumb } from "../../src";

const meta: Meta<typeof AxBreadcrumb> = {
  component: AxBreadcrumb,
  title: "@core/Components/Breadcrumbs",
  tags: ["autodocs"],
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof AxBreadcrumb>;

export const Example: Story = {
  render: (args) => <AxBreadcrumb {...args} />,
  args: {
    items: [
      {
        label: "",
        icon: "mdi mdi-home",
      },
      {
        label: "Section",
      },
      {
        label: "Page",
      },
    ],
  },
};
