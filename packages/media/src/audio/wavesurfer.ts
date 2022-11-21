/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */
import { useLogger } from "@axux/utilities";
import WaveSurfer from "wavesurfer.js";
// @ts-expect-error
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor";
// @ts-expect-error
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
// @ts-expect-error
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";

const CHANNEL_COLORS = [
  ["#75BBC1", "#108188"],
  ["#74a9cf", "#0570b0"],
  ["#8c96c6", "#88419d"],
  ["#df65b0", "#ae017e"],
  ["#fa9fb5", "#ce1256"],
  ["#fdbb84", "#ef6548"],
  ["#fec44f", "#cc4c02"],
  ["#bf812d", "#543005"],
];

export const Wavesurfer = (container: HTMLElement, timeline?: HTMLElement) => {
  const logger = useLogger("WaveSurfer");

  const plugins = [
    CursorPlugin.create({
      showTime: true,
      opacity: 1,
      width: "2px",
      style: "dashed",
    }),
    RegionsPlugin.create({
      dragSelection: true,
      color: "rgb(136 87 44 / 20%)",
      handleStyle: {
        left: { width: "1px", backgroundColor: "rgb(136 87 44 / 50%)" },
        right: { width: "1px", backgroundColor: "rgb(136 87 44 / 50%)" },
      },
    }),
  ];
  (timeline != null) &&
    plugins.push(
      TimelinePlugin.create({
        container: timeline,
        primaryColor: "#B8BFCD",
        primaryFontColor: "#B8BFCD",
        secondaryColor: "#D5DBE5",
        secondaryFontColor: "#D5DBE5",
      })
    );

  logger.debug("create instance");
  const instance = WaveSurfer.create({
    container,
    scrollParent: true,
    responsive: true,
    backend: "WebAudio",
    cursorWidth: 2,
    height: 200,
    barWidth: 2,
    barRadius: 3,
    barGap: 1,
    splitChannels: true,
    splitChannelsOptions: {
      overlay: false,
      filterChannels: [],
      channelColors: CHANNEL_COLORS.reduce(
        (ret, c, i) => ({
          ...ret,
          [i]: {
            progressColor: c[1],
            waveColor: c[0],
          },
        }),
        {}
      ),
    },
    xhr: {
      mode: "cors",
    },
    plugins,
  });
  instance.on("ready", () => {
    // @ts-expect-error
    const channels = instance.backend.buffer.numberOfChannels;
    instance.setHeight(200 / channels);
  });
  instance.on("error", (err) => {
    logger.debug("error", err);
  });

  instance.on("region-click", (region: KeyValue) => {
    const { id, start, end } = region;
    logger.debug("play region", { id, start, end });
    region.playLoop();
  });
  instance.on("region-update-end", (region: KeyValue) => {
    const { start, end } = region;
    logger.debug("Region", { start, end });
    region.play();
    region.remove();
  });

  /** ***************** destroy *******************/
  const destroy = () => {
    try {
      instance?.destroy();
    } catch (_) {
      //
    }
  };

  /** ***************** set wave colors *******************/
  const setColors = (colors?: Array<[wave: string, progress: string]>) => {
    colors?.forEach(([wave, progress], idx) => {
      instance?.setWaveColor(wave, idx);
      instance?.setProgressColor(progress, idx);
    });
  };

  /** ***************** set wave regions *******************/
  const setRegions = (
    regions?: Array<{ id: string; start: number; end: number; channel?: number }>
  ) => {
    instance.regions.clear();
    regions?.forEach(({ channel = -1, ...region }) => {
      instance.regions.add({
        ...region,
        channelIdx: channel,
        color: "unkn",
        drag: false,
        resize: false,
      });
    });
  };

  /** ***************** load audio file *******************/
  const loadAudio = async (src: string) => {
    const tmr = logger.timer("load audio");
    if (instance) {
      try {
        instance.setVolume(0.5);
      } catch (_) {
        //
      }
      try {
        instance.setPlaybackRate(1);
      } catch (_) {
        //
      }
      try {
        instance.regions.clear();
      } catch (_) {
        //
      }

      return await new Promise<void>((resolve) => {
        instance.load(src, undefined, undefined, undefined);
        instance.once("ready", () => {
          tmr.end();
          resolve();
        });
      });
    }
    return await Promise.resolve();
  };

  return {
    loadAudio,
    destroy,
    setColors,
    setRegions,
    instance,
  };
};

export type WavesurferInstance = ReturnType<typeof Wavesurfer>;
