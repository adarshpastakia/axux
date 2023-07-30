import type { Meta, StoryObj } from "@storybook/react";
import { AxField } from "../../src";
import { Countries, Country } from "@axux/utilities";

const meta: Meta = {
  title: "@form/Select",
  component: AxField.List,
  parameters: {
    layout: "centered",
    controls: { exclude: ["options", "renderer", "makeLabel"] },
  },
};

export default meta;

export const List: StoryObj<typeof AxField.List<Country>> = {
  render: (args) => {
    return <AxField.List {...args} width="30rem" />;
  },
  args: {
    label: "Listbox",
    options: Countries.list,
    valueProperty: "iso2",
    labelProperty: "name",
    value: ["AE"],
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
