import { Format } from "@axux/utilities";
import { faker } from "@faker-js/faker";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import { AxMap } from "../src";
import locs from "./locations.json";
import { MapSources } from "./sources";

const meta: Meta<typeof AxMap.layers.Cluster> = {
  component: AxMap.layers.Cluster,
  title: "@map/Cluster Map",
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "events" },
  },
};

const events: AnyObject[] = locs.map((l) => ({
  ...l,
  timestamp: Format.date(l.timestamp),
  image: faker.image.url(),
}));

export default meta;
type Story = StoryObj<typeof AxMap.layers.Cluster>;

export const ClusterMap: Story = {
  render: (args) => {
    const mapRef = useRef<AnyObject>(null);
    const [isLoading, setLoading] = useState(false);
    const [exportContent, setExport] = useState<AnyObject>();
    const handleExport = () => {
      void mapRef.current?.exportMap().then(setExport);
    };
    return (
      <>
        <AxMap.Viewer
          defaultSource="color"
          sources={MapSources}
          mapRef={mapRef}
          onLoading={setLoading}
        >
          {/* Zoom tools */}
          <AxMap.tools.Zoom />
          {/* History navigation */}
          <AxMap.tools.Navigation />
          {/* Basemaps list */}
          <AxMap.tools.Basemap />
          {/* Layer list */}
          <AxMap.tools.Layers />
          <AxMap.tools.Selection onUpdate={action("select")} />
          <AxMap.tools.Action
            tooltip="Snapshot"
            icon="esri-icon-bookmark"
            onClick={handleExport}
            isDisabled={isLoading}
          />

          <AxMap.layers.Cluster {...args} />
        </AxMap.Viewer>
        {exportContent && (
          <div
            className="flex flex-col p-16 absolute inset-0 bg-slate-200 bg-opacity-75 backdrop-blur-m"
            onClick={() => setExport(undefined)}
          >
            <img
              className="flex-1 object-contain bg-slate-800 overflow-hidden"
              src={exportContent.image}
            />
            <div className="text-center bg-slate-900 text-white">
              {exportContent.extent}
            </div>
          </div>
        )}
      </>
    );
  },
  args: {
    events,
    actions: [
      {
        id: "view",
        title: "View Event",
        type: "button",
        className: "esri-icon-hollow-eye",
      },
    ],
    clusterActions: [
      {
        id: "filter",
        title: "Add Filter",
        type: "button",
        className: "esri-icon-filter",
      },
    ],
    eventTitle: `<img src={image}/><span>Magnitude {mag} on {timestamp}</span>`,
    eventContent: [
      {
        type: "media",
        mediaInfos: [
          {
            type: "image",
            value: {
              sourceURL: "{image}",
            },
          },
        ],
      },
    ],
    onActionClick: action("action"),
  },
};
