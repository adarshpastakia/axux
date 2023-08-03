import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxText } from "../src";

const meta: Meta<typeof AxText> = {
  title: "@core/Typography",
  component: AxText,
  tags: ["autodocs"],
};

export default meta;
type TextStory = StoryObj<typeof AxText>;

export const Text: TextStory = {
  render: (args) => <AxText {...args} />,
  args: {
    className: "w-96",
    children: faker.lorem.lines(5),
  },
};

export const Abbr: StoryObj<typeof AxText.Abbr> = {
  render: (args) => (
    <AxText className="w-96">
      <AxText.Abbr {...args} />
    </AxText>
  ),
  args: {
    children: `Deserunt corrupti consectetur sed aut ipsam.
    Quas repudiandae ducimus laboriosam qui provident vitae quo facilis.
    Dolores officiis ut repudiandae officiis.
    Perferendis nulla sequi quibusdam maiores porro modi doloremque doloribus illo.
    Similique nobis ratione eius dolores et.`,
    abbr: [
      ["Deserunt", "Something"],
      ["ducimus", "Another"],
      ["ratione", "Another"],
    ],
  },
  parameters: {
    component: AxText.Abbr,
  },
};

export const Mark: StoryObj<typeof AxText.Mark> = {
  render: (args) => (
    <AxText className="w-96">
      <AxText.Mark {...args} />
    </AxText>
  ),
  args: {
    children: `Deserunt corrupti consectetur sed aut ipsam.
    Quas repudiandae ducimus laboriosam qui provident vitae quo facilis.
    Dolores officiis ut repudiandae officiis.
    Perferendis nulla sequi quibusdam maiores porro modi doloremque doloribus illo.
    Similique nobis ratione eius dolores et.`,
    mark: ["Deserunt", "officiis", "quibusdam"],
  },
};

export const Copy: StoryObj<typeof AxText.Copy> = {
  render: (args) => (
    <AxText className="w-96">
      <AxText.Copy {...args} />
      {args.text}
    </AxText>
  ),
  args: {
    text: `Deserunt corrupti consectetur sed aut ipsam.
    Quas repudiandae ducimus laboriosam qui provident vitae quo facilis.
    Dolores officiis ut repudiandae officiis.
    Perferendis nulla sequi quibusdam maiores porro modi doloremque doloribus illo.
    Similique nobis ratione eius dolores et.`,
  },
};
