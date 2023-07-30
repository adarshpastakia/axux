import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxContent, AxHeader, AxPage, AxViewport } from "../../src";

const meta: Meta<typeof AxPage> = {
  component: AxPage,
  title: "@core/Application/Page",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxPage>;

export const Example: Story = {
  render: (args) => (
    <div className="min-h-[32rem] relative">
      <AxViewport>
        <AxPage {...args} />
      </AxViewport>
    </div>
  ),
  args: {
    children: (
      <>
        <AxHeader className="text-primary justify-center">Title</AxHeader>
        <AxContent>
          <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
          <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
          <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
          <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
          <p className="mb-4">{faker.lorem.paragraphs(6)}</p>
        </AxContent>
      </>
    ),
  },
};
