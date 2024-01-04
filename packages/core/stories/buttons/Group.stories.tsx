import type { Meta, StoryObj } from "@storybook/react";
import { AxButton } from "../../src";

const meta: Meta = {
  component: AxButton.Group,
  title: "@core/Button",
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxButton.Group>;

export const Group: Story = {
  render: (args) => (
    <AxButton.Group {...args}>
      <AxButton>One</AxButton>
      <AxButton>Two</AxButton>
      <AxButton>Three</AxButton>
      <AxButton>Four</AxButton>
      <section className="contents" />
    </AxButton.Group>
  ),
  args: {},
};
