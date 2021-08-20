// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxPage, AxViewport } from "@axux/core";
import { Countries } from "@axux/utilities";
import { Story } from "@storybook/react";
import { AxCodeEditor } from "../../src";
import { CodeEditorProps } from "../../src/code/CodeEditor";

const Template: Story<CodeEditorProps> = (props) => (
  <AxViewport>
    <AxPage paper>
      <AxCodeEditor {...props} />
    </AxPage>
  </AxViewport>
);

export const CodeEditorStory = Template.bind({});
CodeEditorStory.args = {
  value: JSON.stringify(Countries.list, null, 2)
};

export default { title: "Example/CodeEditor", component: AxCodeEditor };
