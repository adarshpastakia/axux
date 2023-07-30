import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxChart } from "../src";
import { AxPanel, AxHeader, AxTitle, AxButton } from "@axux/core";
import { useState, useCallback, useEffect } from "react";

const meta: Meta<typeof AxChart.DataSeries> = {
  component: AxChart.DataSeries,
  title: "@charts/DataSeries",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxChart.DataSeries>;

export const Example: Story = {
  render: (args) => {
    const [data, setData] = useState<AnyObject>({});
    const loadData = useCallback(() => {
      const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      setData({
        categoryAxisName: "Months",
        valueAxisName: "Items",
        categories,
        data: [
          {
            id: faker.string.alpha(5),
            label: faker.animal.dog(),
            values: categories.map(() =>
              faker.number.int({ min: 100, max: 500 })
            ),
          },
          {
            id: faker.string.alpha(5),
            label: faker.animal.dog(),
            values: categories.map(() =>
              faker.number.int({ min: 100, max: 500 })
            ),
          },
          {
            id: faker.string.alpha(5),
            label: faker.animal.dog(),
            values: categories.map(() =>
              faker.number.int({ min: 100, max: 500 })
            ),
          },
        ],
      });
    }, []);
    useEffect(() => {
      loadData();
    }, []);
    return (
      <AxPanel minHeight={420} minWidth={600}>
        <AxHeader>
          <AxTitle>Map Series chart</AxTitle>
          <AxButton variant="link" icon="mdi mdi-refresh" onClick={loadData} />
        </AxHeader>
        <AxChart.DataSeries {...args} {...data} />
      </AxPanel>
    );
  },
  args: {},
};
