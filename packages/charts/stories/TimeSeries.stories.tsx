import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxChart } from "../src";
import { AxPanel, AxHeader, AxTitle, AxButton } from "@axux/core";
import { useState, useCallback, useEffect } from "react";

const meta: Meta<typeof AxChart.TimeSeries> = {
  component: AxChart.TimeSeries,
  title: "@charts/TimeSeries",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxChart.TimeSeries>;

export const Example: Story = {
  render: (args) => {
    const [data, setData] = useState<AnyObject>({});
    const loadData = useCallback(() => {
      const categories = Array.from(Array(24), (_, i) => new Date(2021, i, 1));

      setData({
        categoryAxisName: "Months",
        valueAxisName: "Items",
        categories,
        data: [
          {
            id: faker.string.alphanumeric(5),
            label: faker.animal.bear(),
            values: categories.map((c) => [
              c,
              faker.number.int({ min: 100, max: 500 }),
            ]),
          },
          {
            id: faker.string.alphanumeric(5),
            label: faker.animal.bear(),
            values: categories.map((c) => [
              c,
              faker.number.int({ min: 100, max: 500 }),
            ]),
          },
          {
            id: faker.string.alphanumeric(5),
            label: faker.animal.bear(),
            values: categories.map((c) => [
              c,
              faker.number.int({ min: 100, max: 500 }),
            ]),
          },
        ],
      });
    }, []);
    useEffect(() => {
      loadData();
    }, []);
    return (
      <AxPanel minHeight={420}>
        <AxHeader>
          <AxTitle>Time Series chart</AxTitle>
          <AxButton variant="link" icon="mdi mdi-refresh" onClick={loadData} />
        </AxHeader>
        <AxChart.TimeSeries {...args} {...data} />
      </AxPanel>
    );
  },
  args: {},
};
