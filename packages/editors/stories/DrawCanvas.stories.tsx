import type { Meta, StoryObj } from "@storybook/react";
import { AxDrawCanvas } from "../src";
import snapshot from "./snapshot.json";

const meta: Meta<typeof AxDrawCanvas> = {
  component: AxDrawCanvas,
  title: "@editors/Draw Canvas",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "snapshot" },
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
    snapshot,
    assetsPath: "/@tldraw",
  },
};
