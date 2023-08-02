import type { Meta, StoryObj } from "@storybook/react";
import { AxButton, AxDivider, AxMenu } from "../../src";

const meta: Meta = {
  component: AxButton.Dropdown,
  title: "@core/Button",
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxButton.Dropdown>;

export const Dropdown: Story = {
  render: (args) => (
    <>
      <AxButton.Dropdown {...args} usePortal />
    </>
  ),
  args: {
    label: "Click Me",
    children: (
      <>
        <AxMenu.Item label="Menu item" />
        <AxMenu.Item label="Menu item" />
        <AxMenu.Item label="Menu item" />
        <AxDivider size="xs" />
        <AxMenu.Item label="Menu item" />
      </>
    ),
  },
};
