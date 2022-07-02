/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  AxContent,
  AxFlexBox,
  AxHeader,
  AxPanel,
  AxText,
  AxTitle,
  AxViewport,
} from "@axux/core";
import { ComponentStory } from "@storybook/react";
import { useCallback, useEffect, useState } from "react";
import { AxTimeline } from "../../src";

export const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nulla luctus sem congue iaculis. Praesent lobortis gravida nibh non sodales. Ut lacinia nulla ac pellentesque ullamcorper. Phasellus non quam lorem. Etiam consectetur dapibus dapibus. Nunc diam libero, facilisis a rhoncus eget, fermentum non lacus.";

export const TimelineStory: ComponentStory<typeof AxTimeline> = ({ count }) => {
  const [isLoading, setLoading] = useState(false);
  const [recordCount, setCount] = useState(0);

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
      <AxTimeline
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
                      <img
                        loading="lazy"
                        height={96}
                        width={128}
                        className="border-4 border-neutral-400"
                        src={`https://picsum.photos/id/${
                          props.index % 1080
                        }/128/96`}
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
