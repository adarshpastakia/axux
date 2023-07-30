import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Textarea,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Textarea: StoryObj<typeof AxField.Textarea> = {
  render: (args) => {
    return <AxField.Textarea {...args} width="30rem" />;
  },
  args: {
    label: "Textarea input",
    value: faker.lorem.paragraph(),
    allowClear: true,
    rows: 8,
    placeholder: "Textarea input...",
  },
};
