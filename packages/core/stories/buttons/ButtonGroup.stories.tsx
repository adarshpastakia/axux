/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Meta, StoryObj } from "@storybook/react";
import { AxButton } from "../../src";

const meta: Meta<typeof AxButton.Group> = {
  component: AxButton.Group,
  title: "@core/Button/Group",
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxButton.Group>;

export const Group: Story = {
  render: (args) => (
    <AxButton.Group {...args}>
      <AxButton>Button 1</AxButton>
      <AxButton>Button 2</AxButton>
      <AxButton>Button 3</AxButton>
    </AxButton.Group>
  ),
  args: {},
};
