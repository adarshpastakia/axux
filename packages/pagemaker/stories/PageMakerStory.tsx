/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxViewport } from "@axux/core";
import { ComponentStory } from "@storybook/react";
import { AxPageMaker, EnumTypes, PageConfig, WidgetObject } from "../src";

const widgets: WidgetObject[] = [
  {
    id: "widget-1",
    icon: "mdi mdi-chart-pie",
    title: "Test Widget",
  },
];

const config: PageConfig = [
  {
    id: "head-1",
    type: EnumTypes.HEADING,
    title: "Heading",
    color: "#487eb0",
    size: 1.5,
  },
  {
    id: "row-1",
    type: EnumTypes.ROW,
    height: "auto",
    children: [
      {
        id: "col-1",
        type: EnumTypes.COL,
        colSpan: 3,
        children: [
          {
            id: "tile-1",
            widgetId: widgets[0].id,
            type: EnumTypes.TILE,
            title: "Tile head",
            bordered: true,
            expandable: false,
            aspect: "4 / 3",
            color: "#227093",
          },
        ],
      },
    ],
  },
  {
    id: "div-1",
    type: EnumTypes.DIVIDER,
  },
  {
    id: "row-2",
    type: EnumTypes.ROW,
    height: 400,
    children: [
      {
        id: "col-2",
        type: EnumTypes.COL,
        colSpan: 6,
        children: [
          {
            id: "tile-2",
            widgetId: widgets[0].id,
            type: EnumTypes.TILE,
            title: "Tile head",
            bordered: true,
            expandable: true,
            color: "#227093",
            info: "<b>Information Card</b>\nThis tooltip can display information for the <u>widget</u>\nCan include <em>HTML tags</em>",
            iconCls: "mdi mdi-chart-pie",
          },
        ],
      },
      {
        id: "col-3",
        type: EnumTypes.COL,
        colSpan: 6,
        children: [],
      },
    ],
  },
];

const addNew = (callback: AnyObject) => {
  const newWidget = {
    id: "widget-2",
    title: "Widget New",
    icon: "mdi mdi-chart-bar",
  };
  widgets.push(newWidget);
  callback({ id: "widget-2", title: "Widget New", icon: "mdi mdi-chart-bar" });
};

const Template: ComponentStory<typeof AxPageMaker> = (props) => {
  return (
    <AxViewport>
      <AxPageMaker {...props} />
    </AxViewport>
  );
};
export const PageMakerStory = Template.bind({});
PageMakerStory.args = {
  config,
  widgets,
  onAdd: addNew,
  renderWidget: (widget) => <div>Widget here - {widget}</div>,
};

export default { title: "AxPageMaker", component: AxPageMaker };
