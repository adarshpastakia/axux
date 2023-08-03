import { useNotificationService } from "@axux/core";
import type { Meta, StoryObj } from "@storybook/react";
import { AxButton } from "../../src";
import { AxMessage } from "../../src/overlays/Message";

const meta: Meta<typeof AxMessage> = {
  title: "@core/Notifications",
  component: AxMessage,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Message: StoryObj<typeof AxMessage> = {
  render: (args) => {
    const { message } = useNotificationService();
    return <AxButton onClick={() => message(args)}>Open Message</AxButton>;
  },
  args: {
    message: "Sample message",
  },
};
