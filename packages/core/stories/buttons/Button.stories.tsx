import type { Meta, StoryObj } from "@storybook/react";
import { AxButton } from "../../src";

const meta: Meta<typeof AxButton> = {
  component: AxButton,
  title: "@core/Button",
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxButton>;

export const Basic: Story = {
  render: (args) => <AxButton {...args} />,
  args: {
    children: "Click Me",
    tooltip: "Button tooltip",
  },
};

export const WithIcon: Story = {
  render: (args) => <AxButton {...args} />,
  args: {
    children: "Click Me",
    icon: "mdi mdi-bell",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <AxButton {...args} size="sm">
        Small
      </AxButton>
      <AxButton {...args} size="normal">
        Normal
      </AxButton>
      <AxButton {...args} size="md">
        Medium
      </AxButton>
      <AxButton {...args} size="lg">
        Large
      </AxButton>
    </>
  ),
  args: {},
};

export const Variants: Story = {
  render: (args) => (
    <>
      <AxButton {...args} variant="normal">
        Default
      </AxButton>
      <AxButton {...args} variant="outline">
        Outline
      </AxButton>
      <AxButton {...args} variant="solid">
        Solid
      </AxButton>
      <AxButton {...args} variant="link">
        Link
      </AxButton>
    </>
  ),
  args: {},
};

export const Colors: Story = {
  render: (args) => (
    <>
      <AxButton {...args} color="primary">
        Primary
      </AxButton>
      <AxButton {...args} color="accent">
        Accent
      </AxButton>
      <AxButton {...args} color="success">
        Success
      </AxButton>
      <AxButton {...args} color="danger">
        Danger
      </AxButton>
      <AxButton {...args} color="warning">
        Warning
      </AxButton>
    </>
  ),
  args: {},
};

export const Badges: Story = {
  render: (args) => (
    <>
      <AxButton
        {...args}
        badge={{
          value: "9",
        }}
      />
      <AxButton
        {...args}
        badge={{
          value: "New",
          placement: "top",
          color: "accent",
        }}
      />
      <AxButton
        {...args}
        badge={{
          placement: "top-end",
          color: "danger",
          icon: "mdi mdi-bell",
          ping: true,
        }}
      />
      <AxButton
        {...args}
        badge={{
          placement: "top-end",
          color: "success",
          ping: true,
        }}
      />
    </>
  ),
  args: {
    children: "Click Me",
  },
};
