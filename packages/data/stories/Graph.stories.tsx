import { Meta, StoryObj } from "@storybook/react";
import { AxGraph } from "../src";

import data from "./graph.json";

const meta: Meta<typeof AxGraph> = {
  component: AxGraph,
  title: "@data/Graph",
  tags: [],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "data" },
  },
};

export default meta;
type Story = StoryObj<typeof AxGraph>;

export const Example: Story = {
  render: (args) => {
    return (
      <div className="h-full min-h-[600px] grid overflow-hidden">
        <div className="w-full h-full ax-section grid-area-[unset]">
          <AxGraph data={data} />
        </div>
      </div>
    );
  },
  args: {},
};
