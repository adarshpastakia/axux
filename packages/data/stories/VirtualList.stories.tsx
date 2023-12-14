import { AxCard, AxFlexBox, AxIcon, AxText, AxViewport } from "@axux/core";
import { Countries } from "@axux/utilities";
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxVirtualItem, AxVirtualList } from "../src";

const meta: Meta<typeof AxVirtualList> = {
  component: AxVirtualList,
  title: "@data/Virtual/List",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "items" },
  },
};

export default meta;
type Story = StoryObj<typeof AxVirtualList>;

const count = 10;
const lorem = faker.lorem.paragraph();
export const Example: Story = {
  render: (args) => {
    return (
      <AxViewport>
        <AxVirtualList {...args} height={160} isSticky={(idx) => idx < 2}>
          {({ data, ...props }) => (
            <AxVirtualItem {...props}>
              <div className="pb-2 w-[480px] h-[160px] grid flex-1">
                <AxCard className="p-2 overflow-hidden">
                  <AxFlexBox.Row
                    className="text-lg font-semibold"
                    align="center"
                  >
                    <AxIcon icon={`flag ${data.iso3}`} className="ring-1" />
                    <AxText.Ellipsis className="flex-1 px-2">
                      {data.name}
                    </AxText.Ellipsis>
                    <AxText>&nbsp;{data.emoji}</AxText>
                  </AxFlexBox.Row>
                  <AxFlexBox.Row justify="between" align="center">
                    <AxText>{data.fullname}</AxText>
                    <AxText className="text-sm text-muted">
                      {data.continent}
                    </AxText>
                  </AxFlexBox.Row>
                  <AxFlexBox.Row justify="between">
                    <AxText className="text-sm text-muted">
                      {data.capital}
                    </AxText>
                    <AxText className="text-sm text-muted">
                      {data.iso2}/{data.iso3}
                    </AxText>
                  </AxFlexBox.Row>
                  <AxFlexBox.Row justify="between">
                    <AxText className="text-sm text-muted">{data.phone}</AxText>
                    <AxText className="text-sm text-muted">
                      {data.currency}
                    </AxText>
                  </AxFlexBox.Row>
                </AxCard>
              </div>
            </AxVirtualItem>
          )}
        </AxVirtualList>
      </AxViewport>
    );
  },
  args: {
    items: Countries.list,
  },
};
