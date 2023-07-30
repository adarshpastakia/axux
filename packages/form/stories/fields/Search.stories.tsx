import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Inputs",
  component: AxField.Search,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Search: StoryObj<typeof AxField.Search> = {
  render: (args) => {
    return <AxField.Search {...args} width="30rem" />;
  },
  args: {
    label: "Search input",
    value: "Sample Search",
    placeholder: "Search input...",
  },
};
