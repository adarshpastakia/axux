/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Meta, StoryObj } from "@storybook/react";
import { AxButton } from "../../src";
import { fn } from "@storybook/test";

const meta: Meta<typeof AxButton.Confirm> = {
  component: AxButton.Confirm,
  title: "@core/Button/Confirm",
  parameters: {
    controls: { exclude: "children" },
    docs: { story: { height: "10rem" } },
  },
};

export default meta;
type Story = StoryObj<typeof AxButton.Confirm>;

export const Confirm: Story = {
  render: (args) => (
    <div className="w-64 px-8 py-4 flex justify-center">
      <AxButton.Confirm {...args} />
    </div>
  ),
  args: {
    children: "Test Confirm",
    message: "Shall it be confirmed?",
    onClick: fn(),
  },
};
