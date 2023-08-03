import { useNotificationService } from "@axux/core";
import type { Meta, StoryObj } from "@storybook/react";
import { AxButton } from "../../src";
import { AxToast } from "../../src/overlays/Toast";

const meta: Meta<typeof AxToast> = {
  title: "@core/Notifications",
  component: AxToast,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Toast: StoryObj<typeof AxToast> = {
  render: (args) => {
    const { toast } = useNotificationService();
    return <AxButton onClick={() => toast(args)}>Open Toast</AxButton>;
  },
  args: {
    title: "Sample toast",
    message: "Toast message goes here",
  },
};
