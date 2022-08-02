/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxMenu } from "@axux/core";
import { AxSuperDate } from "@axux/date";
import { AxField } from "@axux/form";
import { action } from "@storybook/addon-actions";
import { AxSearchBar, EnumFieldType, EnumOperator } from "../src";

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
];

export const SearchbarStory = () => {
  return (
    <AxSearchBar
      onQuery={() => {
        action("onQuery");
        return [];
      }}
      onSearch={action("onSearch")}
      filters={filters}
      fields={fields}
      prepend={
        <AxField.Select
          width="12rem"
          value="All"
          options={["All", "Table 1", "Table 2", "Table 3"]}
        />
      }
      append={
        <AxSuperDate className="min-w-[12rem]" style="outline" />
      }
      actions={[
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
      ]}
    />
  );
};
