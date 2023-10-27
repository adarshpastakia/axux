import type { Meta, StoryObj } from "@storybook/react";
import {
  ArtifactObject,
  AxPageMaker,
  EnumTypes,
  PageConfig,
  WidgetObject,
} from "../src";

const meta: Meta<typeof AxPageMaker> = {
  component: AxPageMaker,
  title: "@pagemaker/PageMaker",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxPageMaker>;

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
    text: `
# Sample header

* List item
* List item
* List item

| fgdfgfddsfg | dfgdsfgdfg | sdfgsdfgdsfg | sdfgdfsgdfgdfgdsfgsdfg |
| ----------- | ---------- | ------------ | ---------------------- |
| sdfg        | sdfg       |              |                        |
`,
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

export const Example: Story = {
  render: (args) => {
    return (
      <div className="h-full min-h-[600px] grid overflow-hidden">
        <div className="w-full h-full ax-section grid-area-[unset]">
          <AxPageMaker {...args} />
        </div>
      </div>
    );
  },
  args: {
    config,
    widgets,
    artifacts,
    renderWidget: (widget) => <div>Widget here - {widget}</div>,
  },
};
