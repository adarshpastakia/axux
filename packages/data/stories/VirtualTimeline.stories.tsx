import {
  AxAnimation,
  AxButton,
  AxCallout,
  AxCard,
  AxHeader,
  AxSection,
  AxText,
  AxTimelineCard,
  AxViewport,
} from "@axux/core";
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { AxVirtualItem, AxVirtualList } from "../src";
import { VirtualListRef } from "../src/virtual/List";
import { AxDateDisplay } from "@axux/date";

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
        actions={
          <AxButton.Group isVertical variant="plain">
            <AxButton icon="mdi mdi-plus" />
            <AxButton icon="mdi mdi-minus" />
          </AxButton.Group>
        }
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
    </AxVirtualItem>
  );
};

const ChatItem = ({ data, index, ...props }: AnyObject) => {
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
        reverse={index % 2 === 1}
        size="lg"
        color="#f1f5f9"
        bg={index % 2 ? "#ef4444" : "#10b981"}
        noLine
        actions={
          <Fragment>
            <AxButton.Group isVertical variant="plain">
              <AxButton icon="mdi mdi-plus" />
              <AxButton icon="mdi mdi-minus" />
            </AxButton.Group>
            <div className="w-16" />
          </Fragment>
        }
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

export const Messaging: Story = {
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
        <AxVirtualList
          {...args}
          width={672}
          listRef={listRef}
          items={itemList}
          onLoadMore={loadMore}
          isLoading={isLoading}
        >
          {(props) => <ChatItem {...props} />}
        </AxVirtualList>
      </AxViewport>
    );
  },
  args: {},
};

const historyList = new Array(count).fill(0).map(() => ({
  timestamp: faker.date.recent().toISOString(),
  account: faker.person.fullName(),
  action: faker.word.verb(),
  comment: faker.lorem.lines(1),
  showComment: faker.number.int(1) === 1,
}));

export const History: Story = {
  render: (args) => {
    const listRef = useRef<VirtualListRef>();
    const [isLoading, setLoading] = useState(false);

    const loadMore = useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        historyList.push(
          ...new Array(25).fill(0).map(() => ({
            timestamp: faker.date.recent().toISOString(),
            account: faker.person.fullName(),
            action: faker.word.verb(),
            comment: faker.lorem.lines(1),
            showComment: faker.number.int(1) === 1,
          }))
        );
        setLoading(false);
      }, 2500);
    }, [count]);

    return (
      <AxViewport>
        <AxVirtualList
          {...args}
          width={672}
          listRef={listRef}
          items={historyList}
          onLoadMore={loadMore}
          isLoading={isLoading}
        >
          {({ data, ...props }) => (
            <AxVirtualItem {...props}>
              <AxTimelineCard
                size={data.showComment ? "lg" : "sm"}
                isPlain
                className="flex-1 max-w-2xl"
                bodyClassName="pb-8"
                color={data.showComment ? undefined : "#94a3b8"}
                icon={data.showComment ? undefined : "mdi mdi-bell"}
              >
                <div className="flex gap-2">
                  <span className="font-medium">{data.account}</span>
                  <span>{data.action}</span>
                  <AxDateDisplay
                    className="font-medium"
                    date={data.timestamp}
                  />
                </div>
                {data.showComment && (
                  <AxCard className="p-4">{data.comment}</AxCard>
                )}
              </AxTimelineCard>
            </AxVirtualItem>
          )}
        </AxVirtualList>
      </AxViewport>
    );
  },
  args: {},
};
