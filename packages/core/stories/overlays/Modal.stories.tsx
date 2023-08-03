import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AxButton,
  AxContent,
  AxModal,
  AxText,
  useOverlayService,
} from "../../src";

const meta: Meta<typeof AxModal> = {
  title: "@core/Overlays",
  component: AxModal,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

const ModalStory = (args: KeyValue) => {
  const [Overlay, openOverlay] = useOverlayService((props) => (
    <AxModal {...args} {...props}>
      <AxContent>
        <AxText>{faker.lorem.paragraphs(9)}</AxText>
      </AxContent>
    </AxModal>
  ));

  return (
    <>
      <AxButton onClick={openOverlay}>Open Modal</AxButton>
      {Overlay}
    </>
  );
};

export const Modal: StoryObj<typeof AxModal> = {
  render: (args) => {
    return <ModalStory {...args} />;
  },
};
