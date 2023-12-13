import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxContent, AxTimelineCard } from "../../src";

const meta: Meta<typeof AxTimelineCard> = {
  component: AxTimelineCard,
  title: "@core/Components/Timeline Card",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxTimelineCard>;

export const Example: Story = {
  render: (args) => <AxTimelineCard {...args} />,
  args: {
    className: "w-96",
    children: (
      <AxContent>
        <h1 className="text-xl">{faker.commerce.productName()}</h1>
        <p>{faker.lorem.paragraph()}</p>
      </AxContent>
    ),
  },
};
