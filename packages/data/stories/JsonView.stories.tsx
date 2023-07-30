import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxJsonView } from "../src";

const meta: Meta<typeof AxJsonView> = {
  component: AxJsonView,
  title: "@data/JsonView",
  tags: ["autodocs"],
  parameters: {
    controls: { exclude: "json" },
  },
};

export default meta;
type Story = StoryObj<typeof AxJsonView>;

const json = {
  a: 1,
  b: {},
  c: [],
  d: "test",
  e: { a: 2, b: 3 },
  f: [1, 2, 3],
  f2: [
    { a: 2, b: 3 },
    { a: 2, b: 3 },
    { a: 2, b: 3 },
  ],
  g: undefined,
  h: 33.45,
  i: "+99.18",
  j: 198267345,
  boolean: {
    _label_: true,
    _score_: 75.69,
  },
  date: "2020-03-04T12:48:00.000",
  time: "12:48:00.000",
  temp: {
    _label_: "Any label",
    _score_: 45.69,
  },
  lipsum: faker.lorem.paragraph(),
};

export const Example: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <AxJsonView {...args} />
    </div>
  ),
  args: {
    json,
    labeler: (p) => (p === "f.0" ? "Test label" : undefined),
  },
};
