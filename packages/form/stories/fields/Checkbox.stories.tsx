import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Checkbox,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Checkbox: StoryObj<typeof AxField.Checkbox> = {
  render: (args) => {
    return (
      <>
        <AxField.Checkbox {...args} />
        <AxField.Checkbox {...args} icon="mdi mdi-clock" />
        <AxField.Checkbox
          {...args}
          icon="mdi mdi-bell"
          iconOff="mdi mdi-bell-outline"
        />
      </>
    );
  },
  args: {
    label: "Checkbox",
  },
};
