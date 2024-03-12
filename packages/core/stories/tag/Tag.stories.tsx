/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { AxTag } from "../../src";

const meta: Meta<typeof AxTag> = {
  component: AxTag,
  title: "@core/Components/Tag",
  argTypes: {
    color: { control: "color" },
  },
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof AxTag>;

export const Example: Story = {
  render: (args) => <AxTag {...args} />,
  args: {
    children: "Tag Label",
    onRemove: fn(),
    onClick: fn(),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-2 items-center">
      <AxTag {...args}>Default</AxTag>
      <AxTag {...args} fill>
        Fill color
      </AxTag>
      <AxTag {...args} icon="mdi mdi-alien">
        With Icon
      </AxTag>
    </div>
  ),
  args: {},
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex gap-2 items-center">
      <AxTag {...args} color="primary">
        Primary
      </AxTag>
      <AxTag {...args} color="accent">
        Accent
      </AxTag>
      <AxTag {...args} color="info">
        Info
      </AxTag>
      <AxTag {...args} color="danger">
        Danger
      </AxTag>
      <AxTag {...args} color="success">
        Success
      </AxTag>
      <AxTag {...args} color="warning">
        Warning
      </AxTag>
      <AxTag {...args} color="#9333ea">
        #9333ea
      </AxTag>
    </div>
  ),
  args: {},
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-2 items-center">
      <AxTag {...args} size="sm">
        Small
      </AxTag>
      <AxTag {...args}>Default</AxTag>
      <AxTag {...args} size="md">
        Medium
      </AxTag>
    </div>
  ),
  args: {},
};

export const States: Story = {
  render: (args) => (
    <div className="flex gap-2 items-center">
      <AxTag {...args}>Normal</AxTag>
      <AxTag {...args} isDisabled>
        Disabled
      </AxTag>
      <AxTag {...args} onClick={() => true}>
        Clickable
      </AxTag>
      <AxTag {...args} onRemove={() => true}>
        <span>Removable</span>
      </AxTag>
    </div>
  ),
  args: {},
};
