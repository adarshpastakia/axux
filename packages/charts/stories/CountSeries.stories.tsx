import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxChart } from "../src";
import { AxPanel, AxHeader, AxTitle, AxButton } from "@axux/core";
import { useState, useCallback, useEffect } from "react";

const meta: Meta<typeof AxChart.CountSeries> = {
  component: AxChart.CountSeries,
  title: "@charts/CountSeries",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxChart.CountSeries>;

export const Example: Story = {
  render: (args) => {
    const [data, setData] = useState<AnyObject[]>([]);
    const loadData = useCallback(() => {
      setData(
        Array.from(Array(Math.ceil(24)), (_, i) => ({
          id: `key-${i}`,
          label: faker.animal.cat(),
          count: faker.number.int({ min: 99, max: 499 }),
        }))
      );
    }, []);
    useEffect(() => {
      loadData();
    }, []);
    return (
      <AxPanel minHeight={420} minWidth={600}>
        <AxHeader>
          <AxTitle>Count Series chart</AxTitle>
          <AxButton variant="link" icon="mdi mdi-refresh" onClick={loadData} />
        </AxHeader>
        <AxChart.CountSeries {...args} data={data} />
      </AxPanel>
    );
  },
  args: {},
};
