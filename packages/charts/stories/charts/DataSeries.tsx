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

const Template: ComponentStory<typeof AxChart.DataSeries> = () => {
  const [data, setData] = useState<AnyObject>({});
  const loadData = useCallback(() => {
    const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    setData({
      categoryAxisName: "Months",
      valueAxisName: "Items",
      categories,
      data: [
        {
          key: faker.datatype.string(5),
          label: faker.random.word(),
          values: categories.map(() =>
            faker.datatype.number({ min: 100, max: 500 })
          ),
        },
        {
          key: faker.datatype.string(5),
          label: faker.random.word(),
          values: categories.map(() =>
            faker.datatype.number({ min: 100, max: 500 })
          ),
        },
        {
          key: faker.datatype.string(5),
          label: faker.random.word(),
          values: categories.map(() =>
            faker.datatype.number({ min: 100, max: 500 })
          ),
        },
      ],
    });
  }, []);
  useEffect(() => {
    loadData();
  }, []);
  return (
    <AxPanel width={600} height={600}>
      <AxHeader>
        <AxTitle>Data Series chart</AxTitle>
        <AxButton style="link" icon="mdi mdi-refresh" onClick={loadData} />
      </AxHeader>
      <AxChart.DataSeries {...data} onClick={action("onClick")} />
    </AxPanel>
  );
};

export const DataSeriesStory = Template.bind({});
DataSeriesStory.args = {};
