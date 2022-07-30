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
import { AxGridView } from "../../src";
import { GridItemProps } from "../../src/virtual/Grid";

export const TempItem = (props: GridItemProps) => undefined;

export const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nulla luctus sem congue iaculis. Praesent lobortis gravida nibh non sodales. Ut lacinia nulla ac pellentesque ullamcorper. Phasellus non quam lorem. Etiam consectetur dapibus dapibus. Nunc diam libero, facilisis a rhoncus eget, fermentum non lacus.";

export const GridStory: ComponentStory<typeof AxGridView> = ({ count }) => {
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
    }, 200);
  }, [recordCount, count]);
  return (
    <AxViewport>
      <AxGridView
        count={recordCount}
        onLoadMore={loadMore}
        isLoading={isLoading}
      >
        {(props) => (
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
                      <AxText clip={6}>{LIPSUM}</AxText>
                    </AxFlexBox.Col>
                  </AxFlexBox.Row>
                </AxFlexBox>
              </AxContent>
            </AxPanel>
          </AxGridView.Item>
        )}
      </AxGridView>
    </AxViewport>
  );
};

export default { title: "AxGridView", component: AxGridView };
