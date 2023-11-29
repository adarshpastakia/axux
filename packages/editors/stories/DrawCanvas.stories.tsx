import { AxAside, AxCard, AxContent, AxSection } from "@axux/core";
import type { Meta, StoryObj } from "@storybook/react";
import { AxDrawCanvas } from "../src";
import snapshot from "./snapshot.json";

const meta: Meta<typeof AxDrawCanvas> = {
  component: AxDrawCanvas,
  title: "@editors/Draw Canvas",
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "snapshot" },
  },
};

export default meta;
type Story = StoryObj<typeof AxDrawCanvas>;

export const DrawCanvas: Story = {
  render: (args) => (
    <div className="h-full min-h-[600px] grid overflow-hidden">
      <div className="w-full h-full ax-section grid-area-[unset]">
        <AxSection>
          <AxDrawCanvas
            {...args}
            renderer={(props) => <AxCard>{props.message}</AxCard>}
          />
          <AxAside>
            <AxContent>
              <AxCard
                draggable
                dragKey="axux/canvas"
                dragData={{
                  type: "image",
                  src: "https://picsum.photos/1920/1080?",
                  fileName: "Image",
                  fileSize: 123456,
                }}
              >
                Sample image
              </AxCard>
              <AxCard
                draggable
                dragKey="axux/canvas"
                dragData={{
                  type: "video",
                  src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                  poster: "https://picsum.photos/1920/1080?",
                  fileName: "Video",
                  fileSize: 123456,
                }}
              >
                Sample video
              </AxCard>
              <AxCard
                draggable
                dragKey="axux/canvas"
                dragData={{
                  type: "file",
                  icon: "https://picsum.photos/48/48?",
                  fileType: "PDF",
                  fileName: "Some file",
                  fileSize: 123456,
                }}
              >
                Sample file
              </AxCard>
              <AxCard
                draggable
                dragKey="axux/canvas"
                dragData={{
                  type: "card",
                  message: "Sample message in a card",
                }}
              >
                Sample card
              </AxCard>
              <AxCard
                draggable
                dragKey="axux/canvas"
                dragData={{
                  type: "card",
                  message: "Sample message in a card\nmore lines",
                }}
              >
                Sample card 2
              </AxCard>
            </AxContent>
          </AxAside>
        </AxSection>
      </div>
    </div>
  ),
  args: {
    snapshot,
  },
};
