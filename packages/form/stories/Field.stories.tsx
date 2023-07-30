import { AxButton } from "@axux/core";
import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../src";

const meta: Meta<typeof AxField.Container> = {
  title: "@form/Inputs",
  component: AxField.Container,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
    docs: {
      toc: { disabled: false },
    },
  },
};

export default meta;

export const Container: StoryObj<typeof AxField.Container> = {
  render: (args) => {
    return (
      <AxField.Container {...args} width="30rem">
        <AxField.Addon>Simple addon</AxField.Addon>
        <AxField.Text />
        <AxButton icon="mdi mdi-arrow-right" rtlFlip />
      </AxField.Container>
    );
  },
  args: {
    label: "Field container",
  },
};
