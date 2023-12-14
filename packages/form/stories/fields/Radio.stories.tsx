import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Radio,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Radio: StoryObj<typeof AxField.Radio> = {
  render: (args) => {
    return (
      <>
        <AxField.Radio {...args} name="radio" value="1" />
        <AxField.Radio {...args} name="radio" value="2" icon="mdi mdi-clock" iconOff="mdi mdi-clock-outline" />
      </>
    );
  },
  args: {
    label: "Radio",
  },
};
