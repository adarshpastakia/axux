import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";
import { Countries, Country } from "@axux/utilities";

const meta: Meta = {
  title: "@form/Select",
  component: AxField.Combo,
  parameters: {
    layout: "centered",
    controls: { exclude: ["options", "renderer", "makeLabel"] },
  },
};

export default meta;

export const Combo: StoryObj<typeof AxField.Combo<Country>> = {
  render: (args) => {
    return <AxField.Combo {...args} width="30rem" usePortal />;
  },
  args: {
    label: "Combo list",
    options: Countries.list,
    valueProperty: "iso2",
    labelProperty: "name",
    value: "AE",
    isEditable: true,
    makeLabel: (c) => `${c.emoji} ${c.name}`,
    renderer(opt) {
      return (
        <div className="flex gap-1 items-center">
          {opt.emoji} {opt.name}
        </div>
      );
    },
    onQuery: undefined,
  },
};
