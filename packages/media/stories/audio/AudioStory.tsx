/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxContent, AxViewport } from "@axux/core";
import { ComponentStory } from "@storybook/react";
import { AxAudioPlayer } from "../../src";

const colors: [string, string][] = [
  ["#fa9fb5", "#ce1256"],
  ["#fdbb84", "#ef6548"],
];

const regions = [
  { id: "1", start: 0.2, end: 5.5, channel: 0 },
  { id: "2", start: 4.7, end: 7.5, channel: 1 },
  { id: "3", start: 9.9, end: 24.9, channel: 0 },
  { id: "4", start: 34.2, end: 54.18, channel: 1 },
];

const AudioTemplate: ComponentStory<typeof AxAudioPlayer> = (props) => {
  return (
    <AxViewport>
      <AxContent className="bg-base">
        <AxAudioPlayer
          {...props}
          colors={colors}
          regions={regions}
          // overlaySrc={"https://picsum.photos/1920/1080?overlay"}
        />
      </AxContent>
    </AxViewport>
  );
};

export const AudioStory = AudioTemplate.bind({});
AudioStory.args = {
  src: "/sample.mp3",
};

export default { title: "AxVideoPlayer", component: AxAudioPlayer };
