import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { AxMap } from "../src";
import locs from "./locations.json";
import { MapSources } from "./sources";

const meta: Meta<typeof AxMap.layers.Heatmap> = {
  component: AxMap.layers.Heatmap,
  title: "@map/Heatmap",
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "events" },
  },
};

export default meta;
type Story = StoryObj<typeof AxMap.layers.Heatmap>;

const events: AnyObject[] = [
  ...new Array(99).fill(null).map((l) => ({
    location: faker.location
      .nearbyGPSCoordinate({ origin: [40, -120], radius: 1000, isMetric: true })
      .join(","),
    count: faker.number.int(99),
  })),
  ...new Array(99).fill(null).map((l) => ({
    location: faker.location
      .nearbyGPSCoordinate({ origin: [20, -90], radius: 1000, isMetric: true })
      .join(","),
    count: faker.number.int(99),
  })),
];

export const Heatmap: Story = {
  render: (args) => (
    <AxMap.Viewer defaultSource="roads" sources={MapSources}>
      {/* Zoom tools */}
      <AxMap.tools.Zoom />
      {/* History navigation */}
      <AxMap.tools.Navigation />
      {/* Basemaps list */}
      <AxMap.tools.Basemap />
      {/* Layer list */}
      <AxMap.tools.Layers />
      <AxMap.tools.Comparison
        compareCountField="count"
        onCompareStart={() =>
          Promise.resolve({ events: locs, compareEvents: events } as AnyObject)
        }
      />

      <AxMap.layers.Heatmap {...args} />
    </AxMap.Viewer>
  ),
  args: {
    events: locs as AnyObject,
  },
};
