// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { AxButton, AxContent, AxPage, AxPanel, AxText, AxViewport } from "@axux/core";
import { mdiComment, mdiFaceMan, mdiStar, mdiTag } from "@mdi/js";
import { Story } from "@storybook/react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxGridView } from "../../src";

const list = [
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
    icon: mdiFaceMan,
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

export const records: AnyObject[] = new Array(1000)
  .fill(null)
  .map((_, i) => ({ ...list[Math.floor(Math.random() * list.length)], index: i }));

const Template: Story = (props) => {
  return (
    <AxViewport>
      <AxPage>
        <AxGridView {...props}>
          {records.map((_, index) => (
            <AxGridView.Item key={index} index={index}>
              <div className="ax-row">
                <AxPanel title={`Grid cell ${index}`} className="ax-col ax-col--fill" paper>
                  <AxContent>
                    <div className="ax-row ax-gutter">
                      <img
                        alt="img"
                        className="ax-col ax-col--auto"
                        src="https://picsum.photos/id/128/172"
                        width={128}
                        height={172}
                      />
                      <div className="ax-col ax-col--fill">
                        <AxText clip={4}>{LIPSUM.line}</AxText>
                      </div>
                    </div>
                  </AxContent>
                </AxPanel>
                <div className="ax-col ax-col--auto ax-padding--x--xs">
                  <AxButton.Group vertical>
                    <AxButton icon={mdiStar} />
                    <AxButton icon={mdiComment} />
                  </AxButton.Group>
                </div>
              </div>
            </AxGridView.Item>
          ))}
        </AxGridView>
      </AxPage>
    </AxViewport>
  );
};

export const GridStory = Template.bind({});
GridStory.args = {
  sortOrder: "asc"
};

export default { title: "Example/Grid", component: AxGridView };
