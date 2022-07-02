/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxViewport } from "@axux/core";
import { ComponentStory } from "@storybook/react";
import { AxImageViewer } from "../../src";

export const ImageStory: ComponentStory<typeof AxImageViewer> = () => {
  return (
    <AxViewport>
      <AxImageViewer
        src={"https://picsum.photos/1920/1080?ts=" + new Date().getTime()}
      />
    </AxViewport>
  );
};

export default { title: "AxImageViewer", component: AxImageViewer };
