import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AxButton,
  AxContent,
  AxFlyout,
  AxText,
  useOverlayService,
} from "../../src";

const meta: Meta<typeof AxFlyout> = {
  title: "@core/Overlays",
  component: AxFlyout,
  parameters: {
    layout: "centered",
    controls: { exclude: "children" },
  },
};

export default meta;

const FlyoutStory = (args: KeyValue) => {
  const [Overlay, openOverlay] = useOverlayService((props) => (
    <AxFlyout {...args} {...props}>
      <AxContent>
        <AxText>{faker.lorem.paragraphs(9)}</AxText>
      </AxContent>
    </AxFlyout>
  ));

  return (
    <>
      <AxButton onClick={openOverlay}>Open Flyout</AxButton>
      {Overlay}
    </>
  );
};

export const Flyout: StoryObj<typeof AxFlyout> = {
  render: (args) => {
    return <FlyoutStory {...args} />;
  },
};
