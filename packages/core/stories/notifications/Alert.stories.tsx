import { useNotificationService } from "@axux/core";
import type { Meta, StoryObj } from "@storybook/react";
import { AxButton } from "../../src";
import { AxAlert } from "../../src/overlays/Alert";

const meta: Meta<typeof AxAlert> = {
  title: "@core/Notifications",
  component: AxAlert,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

export const Alert: StoryObj<typeof AxAlert> = {
  render: (args) => {
    const { alert } = useNotificationService();

    return <AxButton onClick={() => alert(args)}>Open Alert</AxButton>;
  },
  args: {
    title: "Sample alert",
    message: "Alert message goes here",
  },
};
