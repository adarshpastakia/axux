import type { Meta, StoryObj } from "@storybook/react";
import { AxAudioPlayer } from "../src";
import src from "/assets/sample.mp3";

const meta: Meta<typeof AxAudioPlayer> = {
  component: AxAudioPlayer,
  title: "@media/AudioPlayer",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxAudioPlayer>;

export const Example: Story = {
  render: (args) => {
    return (
      <div>
        <AxAudioPlayer {...args} />
      </div>
    );
  },
  args: {
    src,
    colors: [
      ["#06b6d4", "#0e7490"],
      ["#14b8a6", "#047857"],
    ],
  },
};
