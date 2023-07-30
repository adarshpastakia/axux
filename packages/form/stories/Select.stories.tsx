import { AxButton, AxIcon } from "@axux/core";
import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../src";
import { Countries, Country } from "@axux/utilities";

const meta: Meta<typeof AxField.Select> = {
  title: "@form/Select",
  component: AxField.Select,
  parameters: {
    layout: "centered",
    controls: { exclude: ["options", "renderer", "makeLabel"] },
    docs: {
      toc: { disabled: false },
    },
  },
};

export default meta;

export const Select: StoryObj<typeof AxField.Select<Country>> = {
  render: (args) => {
    return <AxField.Select {...args} width="30rem" usePortal />;
  },
  args: {
    label: "Select list",
    options: Countries.list,
    valueProperty: "iso2",
    labelProperty: "name",
    value: "AE",
    makeLabel(opt) {
      return (
        <div className="flex gap-1 items-center">
          {opt.emoji} {opt.name}
        </div>
      );
    },
    renderer(opt) {
      return (
        <div className="flex gap-1 items-center">
          {opt.emoji} {opt.name}
        </div>
      );
    },
  },
};
