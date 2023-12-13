import {
  AxAnimation,
  AxButton,
  AxCallout,
  AxHeader,
  AxSection,
  AxText,
  AxTimelineCard,
  AxViewport,
} from "@axux/core";
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AxVirtualItem, AxVirtualList } from "../src";
import { VirtualListRef } from "../src/virtual/List";

const meta: Meta<typeof AxVirtualList> = {
  component: AxVirtualList,
  title: "@data/Virtual/Timeline",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "data" },
  },
};

export default meta;
type Story = StoryObj<typeof AxVirtualList>;

const count = 50;
const itemList = new Array(count).fill(0).map(() => ({
  para: faker.lorem.paragraphs({ min: 1, max: 3 }),
  para2: "",
}));

const Item = ({ data, index, ...props }: AnyObject) => {
  const timerRef = useRef<AnyObject>();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (!data.para2) {
      setLoading(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setLoading(false);
        itemList.splice(index, 1, {
          ...data,
          para2: faker.lorem.lines({ min: 3, max: 6 }),
        });
      }, faker.number.int({ min: 100, max: 500 }));
    }
  }, [data, index]);
  return (
    <AxVirtualItem {...props} index={index}>
      <AxTimelineCard
        className="max-w-2xl flex-1"
        size={index % 2 ? "md" : "lg"}
        noLine={props.isLast}
      >
        <div className="p-4">
          <div>Item {index + 1}</div>
          <AxText clip={3}>{data.para}</AxText>
          {data.para2 && (
            <AxCallout>
              <AxText clip={3}>{data.para2}</AxText>
            </AxCallout>
          )}
          {isLoading && <AxAnimation.Spinner />}
        </div>
      </AxTimelineCard>
      <AxButton.Group isVertical variant="plain">
        <AxButton icon="mdi mdi-plus" />
        <AxButton icon="mdi mdi-minus" />
      </AxButton.Group>
    </AxVirtualItem>
  );
};

const lorem = faker.lorem.paragraph();
export const Example: Story = {
  render: (args) => {
    const listRef = useRef<VirtualListRef>();
    const [isLoading, setLoading] = useState(false);

    const loadMore = useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        itemList.push(
          ...new Array(25).fill(0).map(() => ({
            para: faker.lorem.paragraphs({ min: 1, max: 3 }),
            para2: "",
          }))
        );
        setLoading(false);
      }, 2500);
    }, [count]);

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
              <AxButton onClick={() => listRef.current?.scrollToItem(23)}>
                ScrollTo #24
              </AxButton>
              <AxButton onClick={() => listRef.current?.scrollToItem(35)}>
                ScrollTo #36
              </AxButton>
            </div>
          </AxHeader>
          <AxVirtualList
            {...args}
            width={672}
            listRef={listRef}
            items={itemList}
            onLoadMore={loadMore}
            isLoading={isLoading}
          >
            {(props) => <Item {...props} />}
          </AxVirtualList>
        </AxSection>
      </AxViewport>
    );
  },
  args: {},
};
