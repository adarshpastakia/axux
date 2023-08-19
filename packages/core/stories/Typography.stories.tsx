import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxText } from "../src";
import { Format } from "@axux/utilities";

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

export const Formatters: StoryObj<{
  phone: string;
  bytes: number;
  number: number;
  numberFormat: string;
  seconds: number;
}> = {
  render: (args) => (
    <div className="w-[30rem] p-8">
      <AxText>Phone: {Format.phone(args.phone, true)}</AxText>
      <code className="inline-block bg-base text-muted mb-4 text-sm">
        Format.phone(phoneNumber)
      </code>
      <AxText>Bytes: {Format.bytes(args.bytes)}</AxText>
      <code className="inline-block bg-base text-muted mb-4 text-sm">
        Format.bytes(bytes)
      </code>
      <AxText>Number: {Format.number(args.number, args.numberFormat)}</AxText>
      <code className="inline-block bg-base text-muted mb-4 text-sm">
        Format.number(number, format)
      </code>
      <AxText>Time: {Format.duration(args.seconds, true)}</AxText>
      <code className="inline-block bg-base text-muted mb-4 text-sm">
        Format.duration(seconds, isFraction)
      </code>
      <AxText>Time: {Format.durationSeconds(args.seconds, true)}</AxText>
      <code className="inline-block bg-base text-muted mb-4 text-sm">
        Format.durationSeconds(seconds, isFraction)
      </code>
    </div>
  ),
  args: {
    phone: "+971501234567",
    bytes: 1512,
    number: 12489.99,
    numberFormat: "0,0.00",
    seconds: 12489.128,
  },
};
