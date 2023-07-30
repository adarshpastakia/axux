import type { Meta, StoryObj } from "@storybook/react";
import { AxTag } from "../../src";

const meta: Meta<typeof AxTag> = {
  component: AxTag,
  title: "@core/Tag",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AxTag>;

export const Basic: Story = {
  render: (args) => <AxTag {...args} />,
  args: {
    children: "Click Me",
    tooltip: "Tag tooltip",
  },
};

export const WithIcon: Story = {
  render: (args) => <AxTag {...args} />,
  args: {
    children: "Click Me",
    icon: "mdi mdi-bell",
  },
};

export const Variants: Story = {
  render: (args) => (
    <>
      <AxTag {...args}>Default</AxTag>
      <AxTag {...args} fill>
        Solid color
      </AxTag>
      <AxTag {...args} color="primary">
        Default
      </AxTag>
      <AxTag {...args} color="primary" fill>
        Solid color
      </AxTag>
    </>
  ),
  args: {},
};

export const Colors: Story = {
  render: (args) => (
    <>
      <AxTag {...args} color="primary">
        Primary
      </AxTag>
      <AxTag {...args} color="accent">
        Accent
      </AxTag>
      <AxTag {...args} color="info">
        Info
      </AxTag>
      <AxTag {...args} color="success">
        Success
      </AxTag>
      <AxTag {...args} color="danger">
        Danger
      </AxTag>
      <AxTag {...args} color="warning">
        Warning
      </AxTag>
      <AxTag {...args} color="#8b5cf6">
        #8b5cf6
      </AxTag>
    </>
  ),
  args: {},
};
