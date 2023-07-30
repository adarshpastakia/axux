import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxAside, AxContent, AxHeader, AxText, AxTitle } from "../../src";

const meta: Meta<typeof AxAside> = {
  component: AxAside,
  title: "@core/Components/SidePanel",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxAside>;

const content = faker.lorem.paragraphs(18, "\n\n");
export const Example: Story = {
  render: (args) => (
    <div className="h-full min-h-[600px] grid overflow-hidden">
      <div className="w-full h-full ax-section grid-area-[unset]">
        <AxAside {...args}>
          <AxContent>
            <AxText>{content}</AxText>
          </AxContent>
        </AxAside>
      </div>
    </div>
  ),
  args: {
    title: "Side panel",
    isCollapsable: true,
    isFlyout: true,
    isResizeable: true,
    minWidth: "20rem",
    maxWidth: "50vw",
  },
};
