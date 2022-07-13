/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxViewport } from "@axux/core";
import { Countries } from "@axux/utilities";
import { ComponentStory } from "@storybook/react";
import { AxEditor } from "../../src";
import json from "../../package.json";

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
