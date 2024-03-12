/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import {
  AxButton,
  AxContent,
  AxFooter,
  AxHeader,
  AxIcon,
  AxPanel,
  AxTitle,
} from "../../src";

const meta: Meta<typeof AxPanel> = {
  component: AxPanel,
  title: "@core/Components/Panel",
  subcomponents: {
    "AxPanel.Group": AxPanel.Group,
    "AxPanel.Stack": AxPanel.Stack,
  } as AnyObject,
  argTypes: {},
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxPanel>;

export const Example: Story = {
  render: (args) => (
    <AxPanel {...args}>
      <AxHeader>
        <AxIcon icon="mdi mdi-alien" />
        <AxTitle>Panel title</AxTitle>
      </AxHeader>
      <AxContent>{faker.lorem.paragraph()}</AxContent>
      <AxFooter justify="end">
        <AxButton variant="link">Cancel</AxButton>
        <AxButton variant="solid">Submit</AxButton>
      </AxFooter>
    </AxPanel>
  ),
  args: {
    width: "480px",
  },
};
