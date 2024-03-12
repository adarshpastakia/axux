/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Meta, StoryObj } from "@storybook/react";
import { AxButton } from "../../src";

const meta: Meta<typeof AxButton.Action> = {
  component: AxButton.Action,
  title: "@core/Button/Action",
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxButton.Action>;

export const Action: Story = {
  render: (args) => <AxButton.Action {...args} />,
  args: {
    children: "Test Action",
    message: "Action completed",
  },
};
