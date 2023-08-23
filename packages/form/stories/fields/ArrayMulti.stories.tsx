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

export const MultiArray: StoryObj<typeof AxField.Array> = {
  render: (args) => {
    return (
      <AxForm
        onChange={action("onChange")}
        defaultValues={{
          names: [
            {
              firstName: "",
              lastName: "",
            },
          ],
        }}
      >
        <AxField.Array {...args} width="30rem" name="names">
          <AxForm.Controller name="firstName">
            <AxField.Text placeholder="First name..." autoFocus />
          </AxForm.Controller>
          <AxForm.Controller name="lastName">
            <AxField.Text placeholder="Last name..." />
          </AxForm.Controller>
        </AxField.Array>
      </AxForm>
    );
  },
  args: {
    label: "Array input",
    onAdd() {
      return {
        firstName: "",
        lastName: "",
      };
    },
  },
};
