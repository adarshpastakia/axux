// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { mdiAccountBox } from "@mdi/js";
import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxPage, AxViewport } from "../../dist";
import { AxContent, AxHeading } from "../../src";
import { TabPanelProps } from "../../src/panels/TabPanel";
import { AxTabPanel } from "../../src";

const Template: Story<PropsWithChildren<TabPanelProps>> = (props) => (
  <AxViewport>
    <AxPage paper title="Tab Example">
      <AxTabPanel {...props}>
        <AxTabPanel.Tab id="first" label="First tab" icon={mdiAccountBox} isPinned>
          <AxContent>
            <AxHeading>First Tab</AxHeading>
            <p>{LIPSUM.para}</p>
          </AxContent>
        </AxTabPanel.Tab>
        <AxTabPanel.Tab id="second" label="Second tab" icon={mdiAccountBox} isPinned isLoading>
          <AxContent>
            <AxHeading>Second Tab</AxHeading>
            <p>{LIPSUM.para}</p>
          </AxContent>
        </AxTabPanel.Tab>
        <AxTabPanel.Tab id="closable" label="Can close" badge={9} onClose={() => undefined}>
          <AxContent>{LIPSUM.para}</AxContent>
        </AxTabPanel.Tab>
      </AxTabPanel>
    </AxPage>
  </AxViewport>
);

export const TabStory = Template.bind({});
TabStory.args = {};

export default { title: "Example/Tab", component: AxTabPanel };
