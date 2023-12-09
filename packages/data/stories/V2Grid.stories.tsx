import {
  AxAnimation,
  AxButton,
  AxCallout,
  AxCard,
  AxHeader,
  AxSection,
  AxText,
  AxViewport,
} from "@axux/core";
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AxGrid2, GridRef2 } from "../src";

const meta: Meta<typeof AxGrid2> = {
  component: AxGrid2,
  title: "@data/Virtual 2/Grid",
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "data" },
  },
};

export default meta;
type Story = StoryObj<typeof AxGrid2>;

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
    <AxGrid2.Item {...props} index={index}>
      <AxCard className="p-4">
        <div>Item {index + 1}</div>
        <AxText clip={3}>{data.para}</AxText>
        {data.para2 && (
          <AxCallout>
            <AxText clip={3}>{data.para2}</AxText>
          </AxCallout>
        )}
        {isLoading && <AxAnimation.Spinner />}
      </AxCard>
      <AxButton.Group isVertical variant="plain">
        <AxButton icon="mdi mdi-plus" />
        <AxButton icon="mdi mdi-minus" />
      </AxButton.Group>
    </AxGrid2.Item>
  );
};

export const Grid: Story = {
  render: (args) => {
    const listRef = useRef<GridRef2>();
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
          <AxGrid2
            {...args}
            listRef={listRef}
            items={itemList}
            height={130}
            isLoading={isLoading}
            onLoadMore={loadMore}
          >
            {(props) => <Item {...props} />}
          </AxGrid2>
        </AxSection>
      </AxViewport>
    );
  },
  args: {},
};
