/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ComponentStory } from "@storybook/react";
import { AxTag } from "../../src";

export const TagTemplate: ComponentStory<typeof AxTag> = (props) => (
  <AxTag {...props} />
);

export const TagStory = TagTemplate.bind({});
TagStory.args = {
  onClick: undefined,
  onRemove: undefined,
  children: "Tag Label",
};
export const ColorStory = TagTemplate.bind({});
ColorStory.args = {
  icon: "mdi mdi-bell",
  children: "Tag Label",
  color: "primary",
};
export const ColorValueStory = TagTemplate.bind({});
ColorValueStory.args = {
  icon: "mdi mdi-bell",
  children: "Tag Label",
  color: "#1d4ed8",
};

export default { title: "AxTag", component: AxTag };
