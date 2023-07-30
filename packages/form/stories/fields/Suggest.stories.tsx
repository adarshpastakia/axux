import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";

const meta: Meta = {
  title: "@form/Select",
  component: AxField.Suggest,
  parameters: {
    layout: "centered",
    controls: { exclude: ["options", "renderer", "makeLabel"] },
  },
};

export default meta;

export const Suggest: StoryObj<typeof AxField.Suggest> = {
  render: (args) => {
    return <AxField.Suggest {...args} width="30rem" usePortal />;
  },
  args: {
    label: "Suggest list",
    options: ["category: latest", "category: trending"],
    defaultItems: [
      { value: "category: games", label: "Games", info: "Search latest games" },
      {
        value: "category: dev",
        label: "Dev Tools",
        info: "Search latest developer tools",
      },
    ],
    onQuery: undefined,
  },
};
