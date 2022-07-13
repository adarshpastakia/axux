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

const ImageTemplate: ComponentStory<typeof AxImageViewer> = (props) => {
  return (
    <AxViewport>
      <AxImageViewer
        {...props}
        // overlaySrc={"https://picsum.photos/1920/1080?overlay"}
      />
    </AxViewport>
  );
};

export const ImageStory = ImageTemplate.bind({});
ImageStory.args = {
  src: "https://picsum.photos/1920/1080?",
};

export default { title: "AxImageViewer", component: AxImageViewer };
