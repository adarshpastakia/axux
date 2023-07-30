import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxChart } from "../src";
import { AxPanel, AxHeader, AxTitle, AxButton } from "@axux/core";
import { useState, useCallback, useEffect } from "react";

const meta: Meta<typeof AxChart.ActivityMap> = {
  component: AxChart.ActivityMap,
  title: "@charts/ActivityMap",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxChart.ActivityMap>;

export const Example: Story = {
  render: (args) => {
    const [data, setData] = useState<AnyObject[]>([]);
    const loadData = useCallback(() => {
      const high = Array(7);
      const low = Array(24);
      setData(
        Array.from(high, (_, day) =>
          Array.from(low, (_, hour) => [
            hour,
            day,
            faker.number.int({ min: 0, max: 99 }),
          ])
        )
      );
    }, []);
    useEffect(() => {
      loadData();
    }, []);
    return (
      <AxPanel minHeight={420}>
        <AxHeader>
          <AxTitle>Activity Map chart</AxTitle>
          <AxButton variant="link" icon="mdi mdi-refresh" onClick={loadData} />
        </AxHeader>
        <AxChart.ActivityMap {...args} data={data} />
      </AxPanel>
    );
  },
  args: {},
};
