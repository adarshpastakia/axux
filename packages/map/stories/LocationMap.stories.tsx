import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxMap } from "../src";
import { MapSources } from "./sources";

const meta: Meta<typeof AxMap.layers.Locations> = {
  component: AxMap.layers.Locations,
  title: "@map/Location Map",
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "events" },
  },
};

const events: AnyObject[] = new Array(42).fill(null).map((l) => ({
  type: faker.helpers.arrayElement(["Message", "Image", "Video"]),
  location: faker.location
    .nearbyGPSCoordinate({ origin: [40, -120], radius: 2000, isMetric: true })
    .join(","),
}));

export default meta;
type Story = StoryObj<typeof AxMap.layers.Locations>;

export const LocationMap: Story = {
  render: (args) => (
    <AxMap.Viewer defaultSource="color" sources={MapSources}>
      {/* Zoom tools */}
      <AxMap.tools.Zoom />
      {/* History navigation */}
      <AxMap.tools.Navigation />
      {/* Basemaps list */}
      <AxMap.tools.Basemap />
      {/* Layer list */}
      <AxMap.tools.Layers />

      <AxMap.layers.Locations {...args} />
    </AxMap.Viewer>
  ),
  args: {
    events,
    uniqField: "type",
    colors: [
      { value: "Message", color: "#14b8a6" },
      { value: "Image", color: "#f59e0b" },
      { value: "Video", color: "#6366f1" },
    ],
  },
};
