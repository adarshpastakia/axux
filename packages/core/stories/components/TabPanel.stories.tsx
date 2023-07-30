import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AxAside,
  AxContent,
  AxHeader,
  AxTabPanel,
  AxText,
  AxTitle,
} from "../../src";

const meta: Meta<typeof AxTabPanel> = {
  component: AxTabPanel,
  title: "@core/Components/TabPanel",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxTabPanel>;

const content = faker.lorem.paragraphs(18, "\n\n");
export const Example: Story = {
  render: (args) => (
    <div className="h-full min-h-[600px] grid overflow-hidden">
      <div className="w-full h-full ax-section grid-area-[unset]">
        <AxTabPanel {...args}>
          <AxTabPanel.Tab id="tab1" label="Simple Content">
            <AxContent>
              <AxText>{content}</AxText>
            </AxContent>
          </AxTabPanel.Tab>
          <AxTabPanel.Tab id="tab2" label="Layout Content">
            <AxHeader>
              <AxTitle>Header section</AxTitle>
            </AxHeader>
            <AxAside title="Side panel" />
            <AxContent>
              <AxText>{content}</AxText>
            </AxContent>
          </AxTabPanel.Tab>
        </AxTabPanel>
      </div>
    </div>
  ),
  args: {},
};
