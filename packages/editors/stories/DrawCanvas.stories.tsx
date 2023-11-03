import type { Meta, StoryObj } from "@storybook/react";
import { AxDrawCanvas } from "../src";
import audioSrc from "/assets/sample.mp3";

const meta: Meta<typeof AxDrawCanvas> = {
  component: AxDrawCanvas,
  title: "@editors/Draw Canvas",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "value" },
  },
};

export default meta;
type Story = StoryObj<typeof AxDrawCanvas>;

export const Example: Story = {
  render: (args) => (
    <div className="h-full min-h-[600px] grid overflow-hidden">
      <div className="w-full h-full ax-section grid-area-[unset]">
        <AxDrawCanvas {...args} />
      </div>
    </div>
  ),
  args: {
    shapes: [
      {
        type: "image-card",
        x: 666,
        y: 144,
        props: {
          src: "https://picsum.photos/1920/1080?",
          fileSize: 123456,
          fileName: "Image",
        },
      },
      {
        type: "video-card",
        x: 256,
        y: 72,
        props: {
          poster: "https://picsum.photos/1920/1080?",
          src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          fileSize: 123456,
          fileName: "BigBuckBunny",
        },
      },
      {
        type: "audio-card",
        x: 666,
        y: 72,
        props: {
          src: audioSrc,
          fileSize: 123456,
          fileName: "Sample",
        },
      },
    ],
  },
};
