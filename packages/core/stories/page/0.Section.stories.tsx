/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Meta, StoryObj } from "@storybook/react";
import { AxAside, AxContent, AxFooter, AxHeader, AxSection } from "../../src";

const meta: Meta<typeof AxSection> = {
  component: AxSection,
  subcomponents: {
    AxContent,
    AxHeader,
    AxFooter,
    AxAside,
  } as AnyObject,
  title: "@core/Page Elements",
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxSection>;

export const Section: Story = {
  render: (args) => (
    <div className="viewport-wrapper">
      <AxSection {...args}>
        <AxHeader>Header goes here</AxHeader>
        <AxFooter>Footer goes here</AxFooter>
        <AxAside align="start" width={300}>
          <AxContent>Left side panel</AxContent>
        </AxAside>
        <AxAside align="end" width={300}>
          <AxContent>Right side panel</AxContent>
        </AxAside>
        <AxContent>Padded scrollable content</AxContent>
      </AxSection>
    </div>
  ),
  args: {},
};
