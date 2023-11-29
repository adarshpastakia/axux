import type { Meta, StoryObj } from "@storybook/react";
import json from "../package.json";
import { AxMonacoEditor } from "../src";

import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

loader.config({ monaco });
const meta: Meta<typeof AxMonacoEditor> = {
  component: AxMonacoEditor,
  title: "@editors/Monaco Editor",
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "value" },
  },
};

export default meta;
type Story = StoryObj<typeof AxMonacoEditor>;

export const MonacoEditor: Story = {
  render: (args) => (
    <div className="h-full min-h-[600px] grid overflow-hidden">
      <div className="w-full h-full ax-section grid-area-[unset]">
        <AxMonacoEditor {...args} />
      </div>
    </div>
  ),
  args: {
    value: json,
    suggestions: [
      {
        label: "Version",
        text: "VERSION",
        description: "Test handlebar variable",
      },
    ],
  },
};
