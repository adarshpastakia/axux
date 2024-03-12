/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { AxButton } from "../../src";

const meta: Meta<typeof AxButton> = {
  component: AxButton,
  subcomponents: {
    "AxButton.Group": AxButton.Group,
    "AxButton.Action": AxButton.Action,
    "AxButton.Confirm": AxButton.Confirm,
    "AxButton.Dropdown": AxButton.Dropdown,
  } as AnyObject,
  title: "@core/Button",
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof AxButton>;

export const Basic: Story = {
  render: (args) => <AxButton {...args} />,
  args: {
    children: "Click Me",
    isDisabled: false,
    onClick: fn(),
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-2 items-center">
      <AxButton {...args}>Default</AxButton>
      <AxButton {...args} variant="outline">
        Outline
      </AxButton>
      <AxButton {...args} variant="solid">
        Solid
      </AxButton>
      <AxButton {...args} variant="link">
        Link
      </AxButton>
    </div>
  ),
  args: {},
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex gap-2 items-center">
      <AxButton {...args}>Primary</AxButton>
      <AxButton {...args} color="accent">
        Accent
      </AxButton>
      <AxButton {...args} color="info">
        Info
      </AxButton>
      <AxButton {...args} color="danger">
        Danger
      </AxButton>
      <AxButton {...args} color="success">
        Success
      </AxButton>
      <AxButton {...args} color="warning">
        Warning
      </AxButton>
    </div>
  ),
  args: {},
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-2 items-center">
      <AxButton {...args} size="sm">
        Small
      </AxButton>
      <AxButton {...args}>Default</AxButton>
      <AxButton {...args} size="md">
        Medium
      </AxButton>
      <AxButton {...args} size="lg">
        Large
      </AxButton>
    </div>
  ),
  args: {},
};

export const States: Story = {
  render: (args) => (
    <div className="flex gap-2 items-center">
      <AxButton {...args} isActive>
        Active
      </AxButton>
      <AxButton {...args} isDisabled>
        Disabled
      </AxButton>
      <AxButton {...args} isLoading>
        Loading
      </AxButton>
      <AxButton {...args} isLoading useSpinner>
        <span>Spinner</span>
      </AxButton>
    </div>
  ),
  args: {},
};

export const Icons: Story = {
  render: (args) => (
    <div className="flex gap-2 items-center">
      <AxButton {...args} icon="mdi mdi-alien" iconAlign="start">
        <span>Align start</span>
      </AxButton>
      <AxButton {...args} icon="mdi mdi-alien" iconAlign="end">
        <span>Align end</span>
      </AxButton>
      <AxButton {...args} icon="mdi mdi-alien" iconAlign="top">
        <span>Align top</span>
      </AxButton>
    </div>
  ),
  args: {},
};

export const Extras: Story = {
  render: (args) => (
    <div className="flex gap-2 flex-wrap items-center">
      <AxButton {...args} tooltip="Simple tooltip">
        <span>Simple Tooltip</span>
      </AxButton>
      <AxButton
        {...args}
        tooltip={{
          content: "Button tooltip",
          placement: "top",
          color: "accent",
        }}
      >
        <span>Styled Tooltip</span>
      </AxButton>
      <AxButton {...args} badge={9}>
        Simple badge
      </AxButton>
      <AxButton {...args} badge={{ color: "info", value: "Exp" }}>
        Styled badge
      </AxButton>
      <div className="basis-full" />
      <AxButton
        {...args}
        badge={{ placement: "top", value: "New", color: "danger" }}
      >
        <span>Floating badge</span>
      </AxButton>
      <AxButton {...args} badge={{ color: "danger", ping: true }}>
        <span>Ping badge</span>
      </AxButton>
      <AxButton
        {...args}
        badge={{ color: "success", ping: true, placement: "top-end" }}
      >
        <span>Ping floating badge</span>
      </AxButton>
      <AxButton
        {...args}
        badge={{
          color: "warning",
          ping: true,
          icon: "mdi mdi-bell",
          placement: "top-end",
        }}
      >
        <span>Ping icon badge</span>
      </AxButton>
    </div>
  ),
  args: {},
};
