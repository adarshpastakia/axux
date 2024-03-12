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
  AxCard,
  AxContent,
  AxFooter,
  AxHeader,
  AxIcon,
  AxTitle,
} from "../../src";

const meta: Meta<typeof AxCard> = {
  component: AxCard,
  title: "@core/Components/Card",
  argTypes: {},
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxCard>;

export const Example: Story = {
  render: (args) => (
    <AxCard {...args} className="w-[480px]">
      <AxHeader>
        <AxIcon icon="mdi mdi-alien" />
        <AxTitle>Card title</AxTitle>
      </AxHeader>
      <AxContent>{faker.lorem.paragraph()}</AxContent>
      <AxFooter justify="end">
        <AxButton>Click</AxButton>
      </AxFooter>
    </AxCard>
  ),
  args: {},
};

export const Clickable: Story = {
  render: (args) => (
    <AxCard {...args} className="w-[480px]">
      <AxHeader>
        <AxIcon icon="mdi mdi-alien" />
        <AxTitle>Card title</AxTitle>
      </AxHeader>
      <AxContent>{faker.lorem.paragraph()}</AxContent>
      <AxFooter justify="end">
        <AxButton stopPropagation>Click</AxButton>
      </AxFooter>
    </AxCard>
  ),
  args: {
    onClick: fn(),
  },
};
