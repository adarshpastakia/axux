/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ComponentStory } from "@storybook/react";
import {
  AxApplicationProvider,
  AxButton,
  useNotificationService,
} from "../../src";
import { AxAlert } from "../../src/overlays/Alert";
import { AxMessage } from "../../src/overlays/Message";
import { AxToast } from "../../src/overlays/Toast";

export const AlertStoryRender: ComponentStory<typeof AxAlert> = (props) => {
  const { alert } = useNotificationService();
  const openAlert = () => {
    // Open overlay pass additional props
    alert(props);
  };
  return <AxButton onClick={openAlert}>Open Alert</AxButton>;
};
export const AlertStory: ComponentStory<typeof AxAlert> = (props) => {
  return (
    <AxApplicationProvider>
      <AlertStoryRender {...props} />
    </AxApplicationProvider>
  );
};
export const AlertSource = `
export const AlertStoryRender: ComponentStory<typeof AxAlert> = (props) => {
  const { alert } = useNotificationService();
  const openAlert = () => {
    // Open overlay pass additional props
    alert(props);
  };
  return <AxButton onClick={openAlert}>Open Alert</AxButton>;
};
export const AlertStory: ComponentStory<typeof AxAlert> = (props) => {
  return (
    <AxApplicationProvider>
      <AlertStoryRender {...props} />
    </AxApplicationProvider>
  );
};
`;

export const MessageStoryRender: ComponentStory<typeof AxMessage> = (props) => {
  const { message } = useNotificationService();
  const openMessage = () => {
    // Open overlay pass additional props
    message(props);
  };
  return <AxButton onClick={openMessage}>Open Message</AxButton>;
};
export const MessageStory: ComponentStory<typeof AxMessage> = (props) => {
  return (
    <AxApplicationProvider>
      <MessageStoryRender {...props} />
    </AxApplicationProvider>
  );
};
export const MessageSource = `
export const MessageStoryRender: ComponentStory<typeof AxMessage> = (props) => {
  const { message } = useNotificationService();
  const openMessage = () => {
    // Open overlay pass additional props
    message(props);
  };
  return <AxButton onClick={openMessage}>Open Message</AxButton>;
};
export const MessageStory: ComponentStory<typeof AxMessage> = (props) => {
  return (
    <AxApplicationProvider>
      <MessageStoryRender {...props} />
    </AxApplicationProvider>
  );
};
`;

export const ToastStoryRender: ComponentStory<typeof AxToast> = (props) => {
  const { toast } = useNotificationService();
  const openToast = () => {
    // Open overlay pass additional props
    toast(props);
  };
  return <AxButton onClick={openToast}>Open Toast</AxButton>;
};
export const ToastStory: ComponentStory<typeof AxToast> = (props) => {
  return (
    <AxApplicationProvider>
      <ToastStoryRender {...props} />
    </AxApplicationProvider>
  );
};
export const ToastSource = `
export const ToastStoryRender: ComponentStory<typeof AxToast> = (props) => {
  const { toast } = useNotificationService();
  const openToast = () => {
    // Open overlay pass additional props
    toast(props);
  };
  return <AxButton onClick={openToast}>Open Toast</AxButton>;
};
export const ToastStory: ComponentStory<typeof AxToast> = (props) => {
  return (
    <AxApplicationProvider>
      <ToastStoryRender {...props} />
    </AxApplicationProvider>
  );
};
`;
