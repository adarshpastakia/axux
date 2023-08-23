import { AxButton } from "@axux/core";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { AxField, AxForm } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Array,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const SingleArray: StoryObj<typeof AxField.Array> = {
  render: (args) => {
    return (
      <AxForm defaultValues={{ strings: ["test"] }} onChange={action("onChange")}>
        <AxField.Array {...args} width="30rem" name="strings">
          <AxForm.Controller name="">
            <AxField.Text placeholder="String..." />
          </AxForm.Controller>
        </AxField.Array>
      </AxForm>
    );
  },
  args: {
    label: "Array input",
    onAdd() {
      return "";
    },
  },
};
