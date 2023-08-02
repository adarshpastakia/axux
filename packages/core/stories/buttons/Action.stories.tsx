import type { Meta, StoryObj } from "@storybook/react";
import { AxButton } from "../../src";

const meta: Meta = {
  component: AxButton.Action,
  title: "@core/Button",
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxButton.Action>;

export const Actions: Story = {
  render: (args) => (
    <>
      <AxButton.Action {...args} />
    </>
  ),
  args: {
    children: "Click Me",
    message: "Action completed",
  },
};
