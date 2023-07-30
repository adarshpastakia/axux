import { AxIcon } from "@axux/core";
import { Countries, Country } from "@axux/utilities";
import type { Meta, StoryObj } from "@storybook/react";
import { AxDatagrid, AxJsonView, DatagridColumn } from "../src";

const meta: Meta<typeof AxDatagrid> = {
  component: AxDatagrid,
  title: "@data/Datagrid",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "data" },
  },
};

export default meta;
type Story = StoryObj<typeof AxDatagrid<Country>>;

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

export const Example: Story = {
  render: (args) => (
    <div className="h-full min-h-[600px] grid overflow-hidden">
      <div className="w-full h-full ax-section grid-area-[unset]">
        <AxDatagrid {...args}>
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
      </div>
    </div>
  ),
  args: {
    columns,
    data: Countries.list,
    sort: { name: "name", order: "asc" },
  },
};
