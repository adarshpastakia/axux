/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxViewport } from "@axux/core";
import { ComponentStory } from "@storybook/react";
import { useEffect, useState } from "react";
import { AxMap } from "../../src";

const MapTemplate: ComponentStory<typeof AxMap.Viewer> = (props) => {
  const [sources, setSources] = useState<AnyObject[]>();

  useEffect(() => {
    fetch("https://demotiles.maplibre.org/style.json")
      .then((resp) => resp.json())
      .then((resp) =>
        setSources([
          {
            ...resp,
            id: "vector",
            label: "Vector Style",
            thumbnail: "thumbs/thumb-vec.png",
          },
          {
            id: "raster",
            label: "Raster Style",
            thumbnail: "thumbs/thumb-ras.png",
            glyphs:
              "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
            sources: {
              "raster-tiles": {
                type: "raster",
                tiles: [
                  "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
                ],
                tileSize: 256,
                attribution:
                  'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
              },
            },
            layers: [
              {
                id: "basemap",
                type: "raster",
                source: "raster-tiles",
                minzoom: 0,
                maxzoom: 22,
              },
            ],
          },
        ])
      );
  }, []);

  return (
    <AxViewport>
      {sources && (
        <AxMap.Viewer {...props} sources={sources}>
          <AxMap.Clustermap data="https://maplibre.org/maplibre-gl-js-docs/assets/earthquakes.geojson" />
        </AxMap.Viewer>
      )}
    </AxViewport>
  );
};

export const MapStory = MapTemplate.bind({});
MapStory.args = {};

export default { title: "AxMap", component: AxMap.Viewer };
