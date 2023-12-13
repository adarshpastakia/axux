import {
  AxButton,
  AxCard,
  AxContent,
  AxFlexBox,
  AxHeader,
  AxSection,
  AxText,
  AxTitle,
  AxViewport,
} from "@axux/core";
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useRef, useState } from "react";
import { AxVirtualGallery, AxVirtualItem, VirtualGalleryRef } from "../src";

const meta: Meta<typeof AxVirtualGallery> = {
  component: AxVirtualGallery,
  title: "@data/Virtual/Gallery",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "data" },
  },
};

export default meta;
type Story = StoryObj<typeof AxVirtualGallery>;

const count = 50;
const lorem = faker.lorem.paragraph();
export const Example: Story = {
  render: (args) => {
    const listRef = useRef<VirtualGalleryRef>();
    const [isLoading, setLoading] = useState(false);
    const [recordCount, setCount] = useState(50);

    const loadMore = useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setCount(count + recordCount);
        setLoading(false);
      }, 200);
    }, [recordCount, count]);
    return (
      <AxViewport>
        <AxSection>
          <AxHeader>
            <div>
              <AxButton onClick={() => listRef.current?.hilight(1)}>
                Hilight #2
              </AxButton>
              <AxButton onClick={() => listRef.current?.hilight(2)}>
                Hilight #3
              </AxButton>
              <AxButton onClick={() => listRef.current?.scrollToItem(28)}>
                ScrollTo #29
              </AxButton>
              <AxButton onClick={() => listRef.current?.scrollToItem(35)}>
                ScrollTo #36
              </AxButton>
            </div>
          </AxHeader>
          <AxVirtualGallery
            {...args}
            listRef={listRef}
            width={480}
            items={new Array(recordCount).fill(true)}
            onLoadMore={loadMore}
            isLoading={isLoading}
          >
            {(props) =>
              props.data && (
                <AxVirtualItem {...props}>
                  <div className="grid flex-1">
                    <AxCard>
                      <AxHeader>
                        <AxTitle>List item {props.index + 1}</AxTitle>
                      </AxHeader>
                      <AxContent>
                        <AxFlexBox>
                          <AxFlexBox.Row>
                            <AxFlexBox.Col flex="auto">
                              <img
                                loading="lazy"
                                className="border-4 bg-bw-500/50 border-bw-500 object-contain h-24 w-32"
                                src={`https://picsum.photos/id/${props.index}/192/108`}
                              />
                            </AxFlexBox.Col>
                            <AxFlexBox.Col flex="fill">
                              <AxText clip={3}>{lorem}</AxText>
                            </AxFlexBox.Col>
                          </AxFlexBox.Row>
                        </AxFlexBox>
                      </AxContent>
                    </AxCard>
                  </div>
                  <AxButton.Group
                    isVertical
                    variant="plain"
                    className="self-start"
                  >
                    <AxButton icon="mdi mdi-plus" />
                    <AxButton icon="mdi mdi-minus" />
                  </AxButton.Group>
                </AxVirtualItem>
              )
            }
          </AxVirtualGallery>
        </AxSection>
      </AxViewport>
    );
  },
  args: {},
};
