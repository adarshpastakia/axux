import type { Meta, StoryObj } from "@storybook/react";
import { AxAnimation } from "../../src";

const meta: Meta<typeof AxAnimation> = {
  title: "@core/Animation",
  tags: ["autodocs"],
};

export default meta;
type CardStory = StoryObj<typeof AxAnimation.Card>;
type SpinnerStory = StoryObj<typeof AxAnimation.Spinner>;
type BarStory = StoryObj<typeof AxAnimation.Bars>;
type CircleStory = StoryObj<typeof AxAnimation.Bars>;

export const Info: CardStory = {
  render: (args) => <AxAnimation.Card {...args} />,
  args: {
    className: "w-96",
    showIcon: true,
  },
};

export const Bars: BarStory = {
  render: (args) => <AxAnimation.Bars {...args} />,
  args: {},
};

export const Spinner: SpinnerStory = {
  render: (args) => <AxAnimation.Spinner {...args} />,
  args: { className: "text-primary text-4xl" },
};

export const Circles: CircleStory = {
  render: (args) => (
    <>
      <AxAnimation.Info className="mx-2 text-info-600 text-2xl" />
      <AxAnimation.Check className="mx-2 text-success-600 text-2xl" />
      <AxAnimation.Cross className="mx-2 text-danger-600 text-2xl" />
    </>
  ),
};
