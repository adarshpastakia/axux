// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { mdiCheckCircle } from "@mdi/js";
import { Story } from "@storybook/react";
import { AxButton, useAxNotificationService } from "../../src";
import { AlertProps } from "../../src/overlays/Alert";
import { MessageProps } from "../../src/overlays/Message";
import { ToastProps } from "../../src/overlays/Toast";

const MessageTemplate: Story<MessageProps> = (props) => {
  const { message } = useAxNotificationService();

  return <AxButton onClick={() => message(props)}>Show Message</AxButton>;
};

export const MessageStory = MessageTemplate.bind({});
MessageStory.args = {
  icon: mdiCheckCircle,
  text: "This a notification message"
};

const ToastTemplate: Story<ToastProps> = (props) => {
  const { toast } = useAxNotificationService();

  return <AxButton onClick={() => toast(props)}>Show Toast</AxButton>;
};
export const ToastStory = ToastTemplate.bind({});
ToastStory.args = {
  icon: mdiCheckCircle,
  type: "confirm",
  title: "Toast",
  text: "This a notification message"
};

const AlertTemplate: Story<AlertProps> = (props) => {
  const { alert } = useAxNotificationService();

  return (
    <AxButton
      onClick={() =>
        alert({
          ...props,
          extraActions: [<AxButton key="next">Next</AxButton>, <AxButton key="prev">Prev</AxButton>]
        })
      }
    >
      Show Alert
    </AxButton>
  );
};
export const AlertStory = AlertTemplate.bind({});
AlertStory.args = {
  title: "Alert",
  text: "This a notification message"
};

export default { title: "Example/Notifications", component: useAxNotificationService };
