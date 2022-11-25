/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxViewport } from "@axux/core";
import { faker } from "@faker-js/faker";
import { ComponentStory } from "@storybook/react";
import { AxMap, setMapAssets } from "../../src";

setMapAssets("/@arcgis");

const events = new Array(5000).fill(null).map(() => ({
  location: faker.address.nearbyGPSCoordinate(
    [54.47509919867679, 24.413736135087568],
    500
  ),
  timestamp: faker.date.recent(),
  name: faker.name.fullName(),
}));

const MapTemplate: ComponentStory<typeof AxMap.Viewer> = (props) => {
  return (
    <AxViewport>
      <AxMap.Viewer {...props}>
        <AxMap.tools.Navigation />
        <AxMap.tools.Zoom />
        <AxMap.tools.Action
          icon="esri-icon-experimental"
          onClick={() => alert("clicked")}
        />
        <AxMap.tools.Basemap />
        <AxMap.tools.Layers />

        <AxMap.layers.ClusterLayer
          events={events}
          clusterActions={[
            {
              id: "filter",
              title: "Add Filter",
              type: "button",
              className: "esri-icon-filter",
            },
          ]}
          fieldInfos={[
            {
              fieldName: "name",
              label: "Name",
            },
            {
              fieldName: "timestamp",
              label: "Event date",
              format: { dateFormat: "long-date-short-time" } as AnyObject,
            },
          ]}
          eventTitle="<span>Event <b>{name}</b> on {timestamp}</span>"
        />
      </AxMap.Viewer>
    </AxViewport>
  );
};

export const MapStory = MapTemplate.bind({});
MapStory.args = {
  defaultSource: "watercolor",
  sources: [
    {
      id: "watercolor",
      title: "Watercolor",
      type: "raster",
      thumbnail: "/thumbs/thumb-ras.png",
      url: "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
    },
    {
      id: "colorful",
      title: "Colorful",
      type: "vector",
      thumbnail: "/thumbs/thumb-vec.png",
      url: "https://demotiles.maplibre.org/style.json",
    },
  ],
};

export default { title: "AxMap", component: AxMap.Viewer };
