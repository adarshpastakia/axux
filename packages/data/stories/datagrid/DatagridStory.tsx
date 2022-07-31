/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon, AxPage, AxViewport } from "@axux/core";
import { Countries, Country } from "@axux/utilities";
import { action } from "@storybook/addon-actions";
import { ComponentStory } from "@storybook/react";
import { AxDatagrid, AxJsonView, DatagridColumn } from "../../src";

export const Template: ComponentStory<typeof AxDatagrid> = (props) => {
  const columns: DatagridColumn<Country>[] = [
    {
      name: "iso3",
      label: "ISO3",
      width: 64,
      isPrimary: true,
      tooltip: true,
      isSortable: true,
      isLocked: true,
      align: "center",
      render: (value) => <AxIcon icon={`flag ${value}`} className="ring-1" />,
    },
    {
      name: "name",
      label: "Name",
      tooltip: true,
      isLocked: "start",
      isSortable: true,
      isResizeable: true,
    },
    {
      name: "continent",
      label: "Continent",
      icon: "mdi mdi-web",
      tooltip: true,
      isSortable: true,
      isResizeable: true,
    },
    {
      name: "capital",
      label: "Capital",
      tooltip: true,
      isSortable: true,
      isResizeable: true,
      width: 320,
    },
    {
      name: "fullname",
      label: "Fullname",
      tooltip: true,
      isSortable: true,
      isResizeable: true,
      width: 320,
    },
    {
      name: "currency",
      label: "Currency",
      tooltip: true,
      isSortable: true,
      isResizeable: true,
      width: 64,
    },
    {
      name: "phone",
      label: "Phone",
      tooltip: true,
      isSortable: true,
      isResizeable: true,
      isLocked: "end",
      width: 64,
    },
    {
      name: "tld",
      label: "Domain",
      tooltip: true,
      isSortable: true,
      isResizeable: true,
      isLocked: "end",
      width: 64,
    },
  ];
  return (
    <AxViewport>
      <AxPage isPaper>
        <AxDatagrid
          {...props}
          isSelectable
          className="text-sm"
          data={Countries.list}
          columns={columns}
          sort={{ name: "name", order: "asc" }}
          onSort={action("onSort")}
          onRowSelect={action("onRowSelect")}
        >
          {(record) => (
            <div className="p-2">
              <AxJsonView
                json={record}
                isInline
                labelWidth={270}
                showPropertyTree={false}
              />
            </div>
          )}
        </AxDatagrid>
      </AxPage>
    </AxViewport>
  );
};

export const DatagridStory = Template.bind({});

export default { title: "AxDatagrid", component: AxDatagrid };
