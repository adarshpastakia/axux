// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxPage, AxViewport, useAxGlobals } from "@axux/core";
import { mdiFaceProfile, mdiTag } from "@mdi/js";
import { Story } from "@storybook/react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxTimeline, TimelineRecord } from "../../src";

const entries: Array<TimelineRecord & { body?: string }> = [
  {
    type: "event",
    timestamp: new Date(),
    icon: mdiTag,
    iconBg: "info",
    iconColor: "white",
    username: "Smeg",
    event: "started"
  },
  {
    type: "comment",
    timestamp: new Date(),
    username: "Smeg",
    event: "started",
    icon: mdiFaceProfile,
    body: LIPSUM.para
  },
  {
    type: "event",
    timestamp: new Date(),
    icon: mdiTag,
    iconBg: "info",
    iconColor: "white",
    username: "Smeg",
    event: "started"
  },
  {
    type: "event",
    timestamp: new Date(),
    icon: mdiTag,
    iconBg: "info",
    iconColor: "white",
    username: "Smeg",
    event: "started"
  },
  {
    type: "comment",
    timestamp: new Date(),
    username: "Smeg",
    event: "started",
    body: LIPSUM.para
  }
];

const Template: Story = (props) => {
  const { dateLocale } = useAxGlobals();
  return (
    <AxViewport dateLocale={dateLocale}>
      <AxPage paper>
        <AxTimeline {...props}>
          {[
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries,
            ...entries
          ].map(({ body, ...entry }, i) => (
            <AxTimeline.Entry key={i} {...entry}>
              {body}
            </AxTimeline.Entry>
          ))}
        </AxTimeline>
      </AxPage>
    </AxViewport>
  );
};

export const TimelineStory = Template.bind({});
TimelineStory.args = {};

export default { title: "Example/Timeline", component: AxTimeline };
