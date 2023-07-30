import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxChart } from "../src";
import { AxPanel, AxHeader, AxTitle, AxButton } from "@axux/core";
import { useState, useCallback, useEffect } from "react";

const meta: Meta<typeof AxChart.MapSeries> = {
  component: AxChart.MapSeries,
  title: "@charts/MapSeries",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxChart.MapSeries>;

export const Example: Story = {
  render: (args) => {
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
      <AxPanel minHeight={420} minWidth={600}>
        <AxHeader>
          <AxTitle>Data Series chart</AxTitle>
          <AxButton variant="link" icon="mdi mdi-refresh" onClick={loadData} />
        </AxHeader>
        <AxChart.MapSeries {...args} data={data} />
      </AxPanel>
    );
  },
  args: {},
};
