import {
  AxContent,
  AxFlexBox,
  AxHeader,
  AxPanel,
  AxText,
  AxTitle,
  AxViewport,
} from "@axux/core";
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useEffect, useState } from "react";
import { AxGridView } from "../src";

const meta: Meta<typeof AxGridView> = {
  component: AxGridView,
  title: "@data/Virtual/Grid",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "data" },
  },
};

export default meta;
type Story = StoryObj<typeof AxGridView>;

const count = 10;
const lorem = faker.lorem.paragraph();
export const Example: Story = {
  render: (args) => {
    const [isLoading, setLoading] = useState(false);
    const [recordCount, setCount] = useState(0);

    useEffect(() => {
      setCount(10);
    }, []);
    const loadMore = useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setCount(count + recordCount);
        setLoading(false);
      }, 200);
    }, [recordCount, count]);
    return (
      <AxViewport>
        <AxGridView
          {...args}
          items={new Array(recordCount).fill(true)}
          onLoadMore={loadMore}
          isLoading={isLoading}
        >
          {(props) =>
            props.data && (
              <AxGridView.Item {...props}>
                <AxPanel isCollapsable>
                  <AxHeader>
                    <AxTitle>List item {props.index + 1}</AxTitle>
                  </AxHeader>
                  <AxContent>
                    <AxFlexBox>
                      <AxFlexBox.Row>
                        <AxFlexBox.Col flex="auto">
                          <img
                            height={96}
                            width={128}
                            loading="lazy"
                            className="border-4 border-bw-500 object-contain"
                            src={`https://picsum.photos/id/${props.index}/192/108`}
                          />
                        </AxFlexBox.Col>
                        <AxFlexBox.Col flex="fill">
                          <AxText clip={6}>{lorem}</AxText>
                        </AxFlexBox.Col>
                      </AxFlexBox.Row>
                    </AxFlexBox>
                  </AxContent>
                </AxPanel>
              </AxGridView.Item>
            )
          }
        </AxGridView>
      </AxViewport>
    );
  },
  args: {},
};
