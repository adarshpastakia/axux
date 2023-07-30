import type { Meta, StoryObj } from "@storybook/react";
import json from "../package.json";
import { AxEditor } from "../src";

import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

loader.config({ monaco });
const meta: Meta<typeof AxEditor> = {
  component: AxEditor,
  title: "@data/Editor",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "value" },
  },
};

export default meta;
type Story = StoryObj<typeof AxEditor>;

export const Example: Story = {
  render: (args) => (
    <div className="h-full min-h-[600px] grid overflow-hidden">
      <div className="w-full h-full ax-section grid-area-[unset]">
        <AxEditor {...args} />
      </div>
    </div>
  ),
  args: {
    value: json,
  },
};
