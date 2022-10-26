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

const Template: ComponentStory<typeof AxChart.MapSeries> = () => {
  const [data, setData] = useState<AnyObject[]>([]);
  const loadData = useCallback(() => {
    setData(
      Array.from(Array(Math.ceil(24)), (_, i) => ({
        id: faker.address.countryCode("alpha-2"),
        count: faker.datatype.number({ min: 99, max: 499 }),
      }))
    );
  }, []);
  useEffect(() => {
    loadData();
  }, []);
  return (
    <AxPanel width={800} height={400}>
      <AxHeader>
        <AxTitle>Map Series chart</AxTitle>
        <AxButton style="link" icon="mdi mdi-refresh" onClick={loadData} />
      </AxHeader>
      <AxChart.MapSeries data={data} onClick={action("onClick")} />
    </AxPanel>
  );
};

export const MapSeriesStory = Template.bind({});
MapSeriesStory.args = {};
