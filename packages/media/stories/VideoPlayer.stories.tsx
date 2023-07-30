import type { Meta, StoryObj } from "@storybook/react";
import { AxVideoPlayer } from "../src";

const meta: Meta<typeof AxVideoPlayer> = {
  component: AxVideoPlayer,
  title: "@media/VideoPlayer",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxVideoPlayer>;

const markers: [number, number][] = new Array(250)
  .fill([])
  .map((_, i) => [Math.random() * 596, Math.random()]);
const scenes: [number, string][] = new Array(250)
  .fill([])
  .map((_, i) => [Math.random() * 596, "https://picsum.photos/192/108?" + i]);

export const Example: Story = {
  render: (args) => {
    return (
      <div className="h-full min-h-[600px] grid overflow-hidden">
        <div className="w-full h-full ax-section grid-area-[unset]">
          <AxVideoPlayer {...args} />
        </div>
      </div>
    );
  },
  args: {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    markers,
    scenes,
  },
};
