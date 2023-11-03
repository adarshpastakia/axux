import type { Meta, StoryObj } from "@storybook/react";
import { AxMdxEditor } from "../src";

const meta: Meta<typeof AxMdxEditor> = {
  component: AxMdxEditor,
  title: "@editors/MDX Editor",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "value" },
  },
};

export default meta;
type Story = StoryObj<typeof AxMdxEditor>;

export const Example: Story = {
  render: (args) => (
    <div className="h-full min-h-[600px] grid overflow-hidden">
      <div className="w-full h-full ax-section grid-area-[unset]">
        <AxMdxEditor {...args} />
      </div>
    </div>
  ),
  args: {
    value: `
# Header :happy:

* List item
* List item
* List item

this inline \`code\` test :tada:

\`\`\`js
const x = 10;
\`\`\`

\`\`\`json
{
  "test": 24
}
\`\`\`

\`\`\`bash
# bash
node index.js
\`\`\`

\`\`\`css
.container {
  border: 1px solid red;
}
\`\`\`

\`\`\`html
<html>
  <head>
    <title>Hellow</title>
  </head>
  <body>
    <p>Title</p>
  </body>
</html>
\`\`\`

\`\`\`yaml
source:
  - test: 10
  - value: adg
\`\`\`

`,
  },
};
