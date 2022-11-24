/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxViewport } from "@axux/core";
import { ComponentStory } from "@storybook/react";
import { AxMap, setMapAssets } from "../../src";

setMapAssets("/@arcgis");

const MapTemplate: ComponentStory<typeof AxMap.Viewer> = (props) => {
  return (
    <AxViewport>
      <AxMap.Viewer {...props}>
        <AxMap.tools.Basemap />
        <AxMap.tools.Navigation />
      </AxMap.Viewer>
    </AxViewport>
  );
};

export const MapStory = MapTemplate.bind({});
MapStory.args = {
  defaultSource: "colorful",
  sources: [
    {
      id: "watercolor",
      title: "Watercolor",
      type: "raster",
      url: "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
    },
    {
      id: "colorful",
      title: "Colorful",
      type: "vector",
      url: "https://demotiles.maplibre.org/style.json",
    },
  ],
};

export default { title: "AxMap", component: AxMap.Viewer };
