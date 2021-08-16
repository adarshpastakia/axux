// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxMeter, AxPage, AxViewport } from "@axux/core";
import { Countries } from "@axux/utilities";
import { Story } from "@storybook/react";
import { useMemo } from "react";
import { GridProps } from "../../dist/gird/Grid";
import { AxGridPanel, GridColumn } from "../../src";

const Template: Story<GridProps> = (props) => {
  const columns = useMemo<GridColumn[]>(
    () => [
      {
        type: "string",
        name: "emoji",
        label: "Flag",
        align: "center",
        icon: <span>{Countries.emoji("")}</span>,
        tooltip: true,
        width: "3rem"
      },
      {
        type: "string",
        name: "iso2",
        label: "ISO",
        width: "3rem",
        align: "center",
        tooltip: true,
        isPrimary: true
      },
      {
        type: "string",
        name: "continent",
        label: "Continent",
        width: "8rem",
        isSortable: true,
        isFilterable: true,
        isResizeable: true,
        filterOptions: ["Africa", "Asia", "Europe", "Oceania", "North America", "South America"]
      },
      {
        type: "string",
        name: "name",
        label: "Name",
        isSortable: true,
        isResizeable: true
      },
      {
        type: "string",
        name: "capital",
        label: "Capital",
        isSortable: true,
        isResizeable: true
      },
      {
        type: "number",
        name: "strength",
        label: "Idx",
        width: "12rem",
        align: "center",
        isSortable: true,
        render: (value) => <AxMeter value={value} showLabel />
      }
    ],
    []
  );
  return (
    <AxViewport>
      <AxPage>
        <AxGridPanel {...props} columns={columns} />
      </AxPage>
    </AxViewport>
  );
};

export const GridStory = Template.bind({});
GridStory.args = {
  data: Countries.list.map((c) => ({ ...c, strength: Math.random() * 100 }))
};

export default { title: "Example/Grid", component: AxGridPanel };
