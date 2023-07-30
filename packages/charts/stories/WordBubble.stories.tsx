import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxChart } from "../src";
import { AxPanel, AxHeader, AxTitle, AxButton } from "@axux/core";
import { useState, useCallback, useEffect } from "react";

const meta: Meta<typeof AxChart.WordBubble> = {
  component: AxChart.WordBubble,
  title: "@charts/WordBubble",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxChart.WordBubble>;

export const Example: Story = {
  render: (args) => {
    const [data, setData] = useState<AnyObject[]>([]);
    const loadData = useCallback(() => {
      setData(
        Array.from(Array(faker.number.int({ min: 12, max: 48 })), (_, key) => ({
          id: key,
          label: faker.commerce.product(),
          count: faker.number.int({ min: 99, max: 499 }),
        }))
      );
    }, []);
    useEffect(() => {
      loadData();
    }, []);
    return (
      <AxPanel minHeight={420}>
        <AxHeader>
          <AxTitle>Word Bubble chart</AxTitle>
          <AxButton variant="link" icon="mdi mdi-refresh" onClick={loadData} />
        </AxHeader>
        <AxChart.WordBubble {...args} data={data} />
      </AxPanel>
    );
  },
  args: {},
};
