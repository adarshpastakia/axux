// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import {
  AxAvatar,
  AxButton,
  AxContent,
  AxPage,
  AxPanel,
  AxSection,
  AxText,
  AxViewport,
  useAxGlobals
} from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AxDateDisplay } from "@axux/date";
import { mdiComment, mdiFaceProfile, mdiStar, mdiTag } from "@mdi/js";
import { Story } from "@storybook/react";
import { useState } from "react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxHistogram, AxTimeline, HistogramRecord, TimelineRecord } from "../../src";

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
    body: LIPSUM.para,
    isCollapsable: true,
    sidebar: (
      <AxButton.Group vertical>
        <AxButton icon={mdiStar} />
        <AxButton icon={mdiComment} />
      </AxButton.Group>
    )
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
    body: LIPSUM.para,
    isCollapsable: true,
    sidebar: (
      <AxButton.Group vertical>
        <AxButton icon={mdiStar} />
        <AxButton icon={mdiComment} />
      </AxButton.Group>
    )
  }
];

const Template: Story = (props) => {
  const { dateLocale } = useAxGlobals();

  const [data, setData] = useState<HistogramRecord[]>([
    { id: 0, count: 99, label: "Item 1" },
    { id: 1, count: 72, label: "Item 2" },
    { id: 2, count: 45, label: "Item 3" },
    { id: 3, count: 99, label: "Item 4" },
    { id: 4, count: 72, label: "Item 5" },
    { id: 5, count: 45, label: "Item 6" }
  ]);
  const [negate, setNegate] = useState<HistogramRecord[]>([
    { id: 0, count: 99, label: "Item 1" },
    { id: 1, count: 72, label: "Item 2" },
    { id: 2, count: 45, label: "Item 3" },
    { id: 3, count: 99, label: "Item 4" },
    { id: 4, count: 72, label: "Item 5" },
    { id: 5, count: 45, label: "Item 6" }
  ]);
  return (
    <AxViewport dateLocale={dateLocale}>
      <AxPage paper>
        <AxSection>
          <AxTimeline list={[]} {...props}>
            {({ record: { body, ...record }, ...props }: AnyObject) => (
              <AxTimeline.Entry
                {...props}
                record={record}
                avatar={
                  record.type === "comment" ? (
                    <AxAvatar title="" bg="info" color="indigo" icon={AppIcons.iconFace} />
                  ) : (
                    AppIcons.iconClock
                  )
                }
              >
                <div className="ax-flex">
                  {record.type === "comment" ? (
                    <AxPanel
                      className="ax-col ax-col--fill"
                      paper={record.type === "comment"}
                      isCollapsable={record.type === "comment"}
                    >
                      <AxPanel.Header
                        title={
                          <span>
                            {props.index} - {record.username} @{" "}
                            <AxDateDisplay date={record.timestamp} />
                          </span>
                        }
                      />
                      <AxContent>
                        <p>Test head</p>
                        <AxText clip={4}>{body}</AxText>
                      </AxContent>
                    </AxPanel>
                  ) : (
                    <div className="ax-col ax-col--fill">
                      {props.index} - {record.username} @ <AxDateDisplay date={record.timestamp} />
                    </div>
                  )}
                  <div className="ax-col ax-col--auto ax-padding--x--xs">
                    <AxButton.Group vertical>
                      <AxButton icon={mdiStar} />
                      <AxButton icon={mdiComment} />
                    </AxButton.Group>
                  </div>
                </div>
              </AxTimeline.Entry>
            )}
          </AxTimeline>
          <AxSection.Side end title="Side Left" isCollapsable flyout isResizeable minWidth="20em">
            <AxPanel.Group>
              <AxPanel panelId="histo" title="Histogram">
                <AxContent padding="none">
                  <AxHistogram
                    format="number"
                    total={128}
                    data={data}
                    onClick={(rec) => {
                      rec.color = rec.color === "secondary" ? undefined : "secondary";
                      const newData = [...data];
                      newData.splice(rec.id as number, 1, rec);
                      setData(newData);
                    }}
                  />
                </AxContent>
              </AxPanel>
              <AxPanel panelId="histo2" title="Histogram">
                <AxContent padding="none">
                  <AxHistogram
                    format="number"
                    total={128}
                    data={negate}
                    allowNegate
                    onClick={(rec, b) => {
                      rec.include = b;
                      const newData = [...negate];
                      newData.splice(rec.id as number, 1, rec);
                      setNegate(newData);
                    }}
                  />
                </AxContent>
              </AxPanel>
            </AxPanel.Group>
          </AxSection.Side>
        </AxSection>
      </AxPage>
    </AxViewport>
  );
};

export const TimelineStory = Template.bind({});
TimelineStory.args = {
  list: new Array(1000)
    .fill(null)
    .map((_, i) => ({ ...entries[Math.floor(Math.random() * entries.length)], index: i }))
};

export default { title: "Example/Timeline", component: AxTimeline };
