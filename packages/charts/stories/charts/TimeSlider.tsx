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

const Template: ComponentStory<typeof AxChart.TimeSlider> = () => {
  const [data, setData] = useState<AnyObject>([]);
  const loadData = useCallback(() => {
    const categories = Array.from(
      Array(365 * 3),
      (_, i) => new Date(2022, 0, i + 1)
    );

    setData(
      categories.map((c) => [c, faker.datatype.number({ min: 100, max: 500 })])
    );
  }, []);
  useEffect(() => {
    loadData();
  }, []);
  return (
    <AxPanel width={1024} maxWidth={1024} height={128}>
      <AxHeader>
        <AxTitle>Time Slider chart</AxTitle>
        <AxButton style="link" icon="mdi mdi-refresh" onClick={loadData} />
      </AxHeader>
      <AxChart.TimeSlider
        data={data}
        onBrush={action("onBrush")}
        range={{ start: new Date(2021, 0, 1), end: new Date(2022, 1, 18) }}
      />
    </AxPanel>
  );
};

export const TimeSliderStory = Template.bind({});
TimeSliderStory.args = {};
