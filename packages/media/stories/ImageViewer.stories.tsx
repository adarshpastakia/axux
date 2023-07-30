import type { Meta, StoryObj } from "@storybook/react";
import { AxImageViewer } from "../src";

const meta: Meta<typeof AxImageViewer> = {
  component: AxImageViewer,
  title: "@media/ImageViewer",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxImageViewer>;

export const Example: Story = {
  render: (args) => {
    return (
      <div className="h-full min-h-[600px] grid overflow-hidden">
        <div className="w-full h-full ax-section grid-area-[unset]">
          <AxImageViewer {...args} />
        </div>
      </div>
    );
  },
  args: { src: "https://picsum.photos/1920/1080?" },
};
