import type { Meta, StoryObj } from "@storybook/react";
import { AxButton } from "../../src";

const meta: Meta = {
  component: AxButton.Confirm,
  title: "@core/Button",
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxButton.Confirm>;

export const Confirm: StoryObj<typeof AxButton.Confirm> = {
  render: (args) => (
    <>
      <AxButton.Confirm {...args} />
    </>
  ),
  args: {
    children: "Click Me",
    message: "Are you sure?",
    actionType: "success",
  },
};
