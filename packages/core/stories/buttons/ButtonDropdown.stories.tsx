/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Meta, StoryObj } from "@storybook/react";
import { AxButton, AxMenu } from "../../src";
import { fn } from "@storybook/test";

const meta: Meta<typeof AxButton.Dropdown> = {
  component: AxButton.Dropdown,
  title: "@core/Button/Dropdown",
  parameters: {
    controls: { exclude: "children" },
    docs: { story: { height: "10rem" } },
  },
};

export default meta;
type Story = StoryObj<typeof AxButton.Dropdown>;

export const Dropdown: Story = {
  render: (args) => <AxButton.Dropdown {...args} usePortal />,
  args: {
    label: "Open me",
    children: [
      <AxMenu.Item key="menu-1" label="Menu 1" id="menu-1" />,
      <AxMenu.Item key="menu-2" label="Menu 2" id="menu-2" />,
      <AxMenu.Item key="menu-3" label="Menu 3" id="menu-3" />,
    ],
    onClick: fn(),
  },
};
