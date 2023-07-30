import type { Meta, StoryObj } from "@storybook/react";
import { AxProgress } from "../../src";

const meta: Meta<typeof AxProgress.Bar> = {
  component: AxProgress.Bar,
  title: "@core/Progress",
  tags: ["autodocs"],
};

export default meta;
type ProgressBarStory = StoryObj<typeof AxProgress.Bar>;
type ProgressCircleStory = StoryObj<typeof AxProgress.Circle>;

export const ProgressBar: ProgressBarStory = {
  render: (args) => (
    <div className="w-96">
      <AxProgress.Bar {...args} />
    </div>
  ),
  args: {
    animate: true,
    color: "primary",
    size: "md",
    value: 50,
  },
};

export const ProgressCircle: ProgressCircleStory = {
  render: (args) => <AxProgress.Circle {...args} />,
  args: {
    animate: true,
    color: "primary",
    size: "md",
    value: 50,
  },
};
