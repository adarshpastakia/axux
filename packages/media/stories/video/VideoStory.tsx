/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxViewport } from "@axux/core";
import { ComponentStory } from "@storybook/react";
import { AxVideoPlayer } from "../../src";

const VideoTemplate: ComponentStory<typeof AxVideoPlayer> = (props) => {
  return (
    <AxViewport>
      <AxVideoPlayer
        {...props}
        // overlaySrc={"https://picsum.photos/1920/1080?overlay"}
      />
    </AxViewport>
  );
};

export const VideoStory = VideoTemplate.bind({});
VideoStory.args = {
  src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
};

export default { title: "AxVideoPlayer", component: AxVideoPlayer };
