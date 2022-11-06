/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxViewport } from "@axux/core";
import { ComponentStory } from "@storybook/react";
import json from "../../package.json";
import { AxEditor } from "../../src";

import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

loader.config({ monaco });

export const Template: ComponentStory<typeof AxEditor> = (props) => {
  return (
    <AxViewport>
      <AxEditor {...props} />
    </AxViewport>
  );
};
export const EditorStory = Template.bind({});
EditorStory.args = {
  value: json,
};

export default { title: "AxEditor", component: AxEditor };
