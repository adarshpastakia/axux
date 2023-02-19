/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxApplicationProvider, AxViewport } from "@axux/core";
import { ComponentStory } from "@storybook/react";
import { useEffect, useRef } from "react";
import {
  ArtifactObject,
  AxPageMaker,
  EnumTypes,
  PageConfig,
  WidgetObject,
} from "../src";

const widgets: WidgetObject[] = [
  {
    id: "widget-1",
    icon: "mdi mdi-chart-pie",
    title: "Test Widget",
  },
];

const artifacts: ArtifactObject[] = [
  {
    id: "sample-text",
    title: "Sample text",
    config: {
      type: EnumTypes.PARAGRAPH,
      text: "## Sample text\n\n- Sample markdown formatted text",
    },
  },
];

const config: PageConfig = [
  {
    id: "head-1",
    colSpan: 12,
    type: EnumTypes.HEADING,
    text: "Heading",
    color: "#487eb0",
    size: 1.5,
  },
  {
    id: "image-1",
    colSpan: 3,
    fit: "cover",
    aspect: "16 / 9",
    src: "https://picsum.photos/800/600",
    type: EnumTypes.IMAGE,
  },
  {
    id: "para-1",
    colSpan: 9,
    text: "# Sample header\n- List item\n- List item\n- List item",
    type: EnumTypes.PARAGRAPH,
  },
  {
    id: "div-1",
    colSpan: 12,
    type: EnumTypes.DIVIDER,
  },
  {
    id: "tile-1",
    widgetId: widgets[0].id,
    type: EnumTypes.TILE,
    title: "Tile head",
    bordered: true,
    expandable: false,
    aspect: "4 / 3",
    colSpan: 3,
    color: "#227093",
  },
  {
    id: "tile-2",
    widgetId: widgets[0].id,
    type: EnumTypes.TILE,
    title: "Tile head",
    bordered: true,
    expandable: false,
    colSpan: 6,
    color: "#227093",
    info: "<b>Information Card</b>\nThis tooltip can display information for the <u>widget</u>\nCan include <em>HTML tags</em>",
    icon: "mdi mdi-chart-pie",
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
  const refPage = useRef<AnyObject>();
  useEffect(() => {
    document.addEventListener("contextmenu", () => {
      refPage.current?.getRaw().then(console.log);
    });
  }, []);
  return (
    <AxApplicationProvider>
      <AxViewport>
        <AxPageMaker {...props} pageRef={refPage} />
      </AxViewport>
    </AxApplicationProvider>
  );
};
export const PageMakerStory = Template.bind({});
PageMakerStory.args = {
  mode: "pdf",
  isEditing: true,
  config,
  widgets,
  artifacts,
  onAdd: addNew,
  renderWidget: (widget) => <div>Widget here - {widget}</div>,
};

export default { title: "AxPageMaker", component: AxPageMaker };
