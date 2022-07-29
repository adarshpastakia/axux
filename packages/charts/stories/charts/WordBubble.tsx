/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxHeader, AxPanel, AxTitle } from "@axux/core";
import { faker } from "@faker-js/faker";
import { action } from "@storybook/addon-actions";
import { ComponentStory } from "@storybook/react";
import { useCallback, useEffect, useState } from "react";
import { AxChart } from "../../src";

const Template: ComponentStory<typeof AxChart.WordBubble> = () => {
  const [data, setData] = useState<AnyObject[]>([]);
  const loadData = useCallback(() => {
    setData(
      Array.from(Array(Math.ceil(Math.random() * 49)), (_, key) => ({
        key,
        label: faker.random.word(),
        count: faker.datatype.number({ min: 99, max: 499 }),
      }))
    );
  }, []);
  useEffect(() => {
    loadData();
  }, []);
  return (
    <AxPanel width={600} height={600}>
      <AxHeader>
        <AxTitle>Word Bubble chart</AxTitle>
        <AxButton style="link" icon="mdi mdi-refresh" onClick={loadData} />
      </AxHeader>
      <AxChart.WordBubble data={data} onClick={action("onClick")} />
    </AxPanel>
  );
};

export const WordBubbleStory = Template.bind({});
WordBubbleStory.args = {};
