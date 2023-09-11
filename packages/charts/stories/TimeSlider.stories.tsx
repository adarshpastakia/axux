import { AxButton, AxHeader, AxPanel, AxTitle } from "@axux/core";
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useEffect, useState } from "react";
import { AxChart } from "../src";

const meta: Meta<typeof AxChart.TimeSlider> = {
  component: AxChart.TimeSlider,
  title: "@charts/TimeSlider",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxChart.TimeSlider>;

export const Example: Story = {
  render: (args) => {
    const [data, setData] = useState<AnyObject[]>([]);
    const loadData = useCallback(() => {
      const categories = Array.from(
        Array(365 * 3),
        (_, i) => new Date(2022, 0, i + 1)
      );
      setData(
        categories.map((c) => [c, faker.number.int({ min: 100, max: 500 })])
      );
    }, []);
    useEffect(() => {
      loadData();
    }, []);
    return (
      <AxPanel height={100} width="1100px" maxWidth="100%">
        <AxHeader>
          <AxTitle>Time Slider chart</AxTitle>
          <AxButton variant="link" icon="mdi mdi-refresh" onClick={loadData} />
        </AxHeader>
        <AxChart.TimeSlider {...args} data={data} />
      </AxPanel>
    );
  },
  args: {},
};
