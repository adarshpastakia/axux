/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */
import { action } from "@storybook/addon-actions";
import { ComponentStory } from "@storybook/react";
import { AxCallout } from "../../src";

export const CalloutTemplate: ComponentStory<typeof AxCallout> = (args) => {
  return <AxCallout {...args} />;
};
export const CalloutStory = CalloutTemplate.bind({});
CalloutStory.args = {
  color: "success",
  title: "Upload successful",
  icon: "mdi mdi-cloud-upload",
  children: "File was uploaded succcessfully",
  onClose: action("close"),
};

export const CalloutDangerStory = CalloutTemplate.bind({});
CalloutDangerStory.args = {
  color: "danger",
  title: "Upload failed",
  icon: "mdi mdi-cloud-upload",
  children: "Failed to upload file to server",
  onClose: action("close"),
};

export default { title: "AxCallout", component: AxCallout };
