import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Switch,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Switch: StoryObj<typeof AxField.Switch> = {
  render: (args) => {
    return (
      <>
        <AxField.Switch {...args} />
        <AxField.Switch {...args} color="accent" onLabel="YES" offLabel="NO" />
      </>
    );
  },
  args: {
    label: "Switch",
  },
};
