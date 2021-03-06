/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  AxButton,
  AxContent,
  AxFlexBox,
  AxHeader,
  AxPanel,
  AxText,
  AxTitle,
  AxViewport,
  useNotificationService,
} from "@axux/core";
import { AxThumbnail } from "@axux/media";
import { ComponentStory } from "@storybook/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AxTimeline, TimelineRef } from "../../src";
import { TimelineItemProps } from "../../src/virtual/Timeline";

export const TempItem = (props: TimelineItemProps) => undefined;

export const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nulla luctus sem congue iaculis. Praesent lobortis gravida nibh non sodales. Ut lacinia nulla ac pellentesque ullamcorper. Phasellus non quam lorem. Etiam consectetur dapibus dapibus. Nunc diam libero, facilisis a rhoncus eget, fermentum non lacus.";

export const TimelineStory: ComponentStory<typeof AxTimeline> = ({ count }) => {
  const [isLoading, setLoading] = useState(false);
  const [recordCount, setCount] = useState(0);
  const listRef = useRef<TimelineRef>();
  const { message } = useNotificationService();

  useEffect(() => {
    setCount(0);
  }, [count]);
  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setCount(count + recordCount);
      setLoading(false);
    }, 500);
  }, [recordCount, count]);
  return (
    <AxViewport>
      <AxHeader>
        <div className="p-2">
          <AxButton
            onClick={() => {
              const idx = Math.floor(Math.random() * recordCount);
              message(`Scrolling into view ${idx + 1}`);
              listRef.current?.scrollToItem(idx);
            }}
          >
            Scroll Random
          </AxButton>
          <AxButton onClick={() => listRef.current?.scrollToItem(0)}>
            Scroll Top
          </AxButton>
          <AxButton onClick={() => listRef.current?.scrollToItem(recordCount)}>
            Scroll Bottom
          </AxButton>
        </div>
      </AxHeader>
      <AxTimeline
        listRef={listRef}
        count={recordCount}
        onLoadMore={loadMore}
        isLoading={isLoading}
      >
        {(props) => (
          <AxTimeline.Item {...props}>
            <AxPanel isCollapsable>
              <AxHeader>
                <AxTitle>List item {props.index + 1}</AxTitle>
              </AxHeader>
              <AxContent>
                <AxFlexBox>
                  <AxFlexBox.Row>
                    <AxFlexBox.Col flex="auto">
                      <AxThumbnail
                        height={96}
                        width={128}
                        isNsfw={props.index % 3 === 0}
                        src={`https://picsum.photos/id/${props.index}/192/108`}
                      />
                    </AxFlexBox.Col>
                    <AxFlexBox.Col flex="fill">
                      <AxText clip={6}>{LIPSUM}</AxText>
                    </AxFlexBox.Col>
                  </AxFlexBox.Row>
                </AxFlexBox>
              </AxContent>
            </AxPanel>
          </AxTimeline.Item>
        )}
      </AxTimeline>
    </AxViewport>
  );
};

export default { title: "AxTimeline", component: AxTimeline };
