import {
  AxCard,
  AxContent,
  AxFlexBox,
  AxHeader,
  AxIcon,
  AxPanel,
  AxText,
  AxTitle,
  AxViewport,
} from "@axux/core";
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useEffect, useState } from "react";
import { AxList } from "../src";
import { Countries } from "@axux/utilities";

const meta: Meta<typeof AxList> = {
  component: AxList,
  title: "@data/Virtual/List",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "items" },
  },
};

export default meta;
type Story = StoryObj<typeof AxList>;

const count = 10;
const lorem = faker.lorem.paragraph();
export const Example: Story = {
  render: (args) => {
    return (
      <AxViewport>
        <AxList {...args}>
          {({ data, ...props }) =>
            data && (
              <AxList.Item {...props}>
                <AxCard className="p-2 w-72 h-40">
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
              </AxList.Item>
            )
          }
        </AxList>
      </AxViewport>
    );
  },
  args: {
    items: Countries.list,
  },
};
