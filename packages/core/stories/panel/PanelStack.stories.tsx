/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  AxButton,
  AxContent,
  AxFooter,
  AxHeader,
  AxIcon,
  AxPanel,
  AxTitle,
} from "../../src";

const meta: Meta<typeof AxPanel.Stack> = {
  component: AxPanel.Stack,
  title: "@core/Components/Panel",
  argTypes: {},
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxPanel.Stack>;

export const Stack: Story = {
  render: (args) => (
    <AxPanel.Stack {...args}>
      <AxPanel panelId="panel-1" width={420}>
        <AxHeader>
          <AxIcon icon="mdi mdi-alien" />
          <AxTitle>Panel title 1</AxTitle>
        </AxHeader>
        <AxContent>{faker.lorem.paragraph()}</AxContent>
        <AxFooter justify="end">
          <AxButton variant="link">Cancel</AxButton>
          <AxButton variant="solid" data-panel="panel-2">
            Next
          </AxButton>
        </AxFooter>
      </AxPanel>
      <AxPanel panelId="panel-2" width={420}>
        <AxHeader>
          <AxIcon icon="mdi mdi-alien" />
          <AxTitle>Panel title 2</AxTitle>
        </AxHeader>
        <AxContent>{faker.lorem.paragraph()}</AxContent>
        <AxFooter justify="end">
          <AxButton variant="link">Cancel</AxButton>
          <AxButton data-panel="back">Prev</AxButton>
          <AxButton variant="solid" data-panel="panel-3">
            Next
          </AxButton>
        </AxFooter>
      </AxPanel>
      <AxPanel panelId="panel-3" width={420}>
        <AxHeader>
          <AxIcon icon="mdi mdi-alien" />
          <AxTitle>Panel title 3</AxTitle>
        </AxHeader>
        <AxContent>{faker.lorem.paragraph()}</AxContent>
        <AxFooter justify="end">
          <AxButton variant="link">Cancel</AxButton>
          <AxButton data-panel="root">Root</AxButton>
          <AxButton data-panel="back">Prev</AxButton>
          <AxButton variant="solid">Submit</AxButton>
        </AxFooter>
      </AxPanel>
    </AxPanel.Stack>
  ),
  args: {},
};
