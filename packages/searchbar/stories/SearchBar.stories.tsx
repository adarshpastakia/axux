import { AxMenu, AxTag } from "@axux/core";
import { AxSuperDate } from "@axux/date";
import { AxField } from "@axux/form";
import type { Meta, StoryObj } from "@storybook/react";
import { AxSearchBar, EnumFieldType, EnumOperator } from "../src";

const meta: Meta<typeof AxSearchBar> = {
  component: AxSearchBar,
  title: "@searchbar/SearchBar",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["append", "prepend", "actions"] },
  },
};

export default meta;
type Story = StoryObj<typeof AxSearchBar>;

const fields = [
  { field: "text", label: "text", type: EnumFieldType.STRING },
  { field: "number", label: "number", type: EnumFieldType.INT },
  { field: "boolean", label: "boolean", type: EnumFieldType.BOOLEAN },
];
const filters = [
  {
    type: "filter" as AnyObject,
    field: "text",
    operator: EnumOperator.IS,
    value: "yes",
    isScope: true,
  },
  {
    type: "filter" as AnyObject,
    field: "text",
    operator: EnumOperator.IS,
    value: "yes",
    isGlobal: true,
  },
  {
    type: "filter" as AnyObject,
    field: "text",
    operator: EnumOperator.STARTS,
    value: "no",
    isNegative: true,
  },
  {
    type: "filter" as AnyObject,
    field: "text",
    operator: EnumOperator.IN,
    value: ["maybe", "possibly"],
  },
  {
    type: "filter" as AnyObject,
    field: "number",
    operator: EnumOperator.IS,
    value: 9,
  },
  {
    type: "query" as AnyObject,
    label: "field query",
    query: [{ field: "field", match: "test" }],
  },
];

export const Example: Story = {
  render: (args) => {
    return (
      <div className="p-6 h-[220px]">
        <AxSearchBar {...args} />
        <div className="py-4">
          <div className="text-lg border-b">Filter tag colors</div>
          <AxTag color="#7c3aed" fill>
            Scoped filter
          </AxTag>
          <AxTag color="primary" fill>
            Global filter
          </AxTag>
          <AxTag color="primary">Local filter</AxTag>
          <AxTag color="danger">Disabled filter</AxTag>
        </div>
      </div>
    );
  },
  args: {
    defaultQueryList: [
      {
        value: "category: games",
        label: "Games",
        info: "Search latest games",
      },
      {
        value: "category: dev",
        label: "Dev Tools",
        info: "Search latest developer tools",
      },
    ],
    prepend: (
      <AxField.Select
        width="12rem"
        value="All"
        options={["All", "Table 1", "Table 2", "Table 3"]}
      />
    ),
    append: <AxSuperDate className="min-w-[12rem]" variant="outline" />,
    actions: [
      <AxMenu.Item
        key="open"
        icon="mdi mdi-folder-open-outline"
        label="Open search..."
      />,
      <AxMenu.Item
        key="save"
        icon="mdi mdi-content-save-outline"
        label="Save search..."
      />,
    ],
    filters,
    fields,
  },
};
