/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxDivider, AxIcon, AxText } from "@axux/core";
import { AxField } from "@axux/form";
import { Fragment, memo, useCallback, useEffect, useState } from "react";
import { Icons } from "../types/icons";
import { type WavesurferInstance } from "./wavesurfer";

const EQ_FREQUENCY = [
  32, 64, 128, 256, 512, 1000, 2000, 4000, 6000, 8000, 12000, 16000,
];

const EqSlider = memo(
  ({
    index,
    value,
    label,
    onChange,
    color = "",
    forChannel = false,
  }: AnyObject) => (
    <div
      style={{ width: "2.5rem" }}
      data-negative={value === 0 ? "zero" : value < 0}
      data-for-channel={forChannel}
      dir={index === "left" ? "rtl" : "ltr"}
    >
      <AxField.Slider
        isVertical
        step={1}
        height={128}
        value={value}
        showLabels
        color={color}
        data-channel={forChannel}
        maxLabel={`${!forChannel && value > 0 ? "+" : ""}${~~value}`}
        minLabel={label}
        isInvalid={value < 0}
        min={forChannel ? 0 : -40}
        max={forChannel ? 100 : 40}
        onChange={(e) => onChange(index, e)}
      />
    </div>
  )
);
EqSlider.displayName = "AxAudio.EQSlider";

export const Equalizers = memo(
  ({
    isVisible = false,
    wavesurfer,
  }: {
    isVisible: boolean;
    wavesurfer: WavesurferInstance;
  }) => {
    const [filters, setFilters] = useState<AnyObject>([]);

    const [channelGains, setChannelGains] = useState<AnyObject[]>();

    const createFilters = useCallback(() => {
      if (wavesurfer) {
        const EQ = [
          {
            f: EQ_FREQUENCY[0],
            name: "32",
            type: "lowshelf",
          },
          {
            f: EQ_FREQUENCY[1],
            name: "64",
            type: "peaking",
          },
          {
            f: EQ_FREQUENCY[2],
            name: "128",
            type: "peaking",
          },
          {
            f: EQ_FREQUENCY[3],
            name: "256",
            type: "peaking",
          },
          {
            f: EQ_FREQUENCY[4],
            name: "512",
            type: "peaking",
          },
          {
            f: EQ_FREQUENCY[5],
            name: "1k",
            type: "peaking",
          },
          {
            f: EQ_FREQUENCY[6],
            name: "2k",
            type: "peaking",
          },
          {
            f: EQ_FREQUENCY[7],
            name: "4k",
            type: "peaking",
          },
          {
            f: EQ_FREQUENCY[8],
            name: "6k",
            type: "peaking",
          },
          {
            f: EQ_FREQUENCY[9],
            name: "8k",
            type: "peaking",
          },
          {
            f: EQ_FREQUENCY[10],
            name: "12k",
            type: "highshelf",
          },
          {
            f: EQ_FREQUENCY[11],
            name: "16k",
            type: "highshelf",
          },
        ];

        // Create filters
        const backendAc = wavesurfer.instance.backend.getAudioContext();
        const _filters = EQ.map(function (band) {
          const filter = backendAc.createBiquadFilter();
          filter.type = band.type as AnyObject;
          filter.gain.value = 0;
          filter.Q.value = 1;
          filter.frequency.value = band.f;
          return filter;
        });

        const splitFilters = [];
        const gainNodes = [];
        const channels =
          // @ts-expect-error ignore
          wavesurfer.instance.backend.buffer.numberOfChannels ?? 1;
        if (channels > 1) {
          const channelSplitterNode = backendAc.createChannelSplitter(channels);
          const channelMergerNode = backendAc.createChannelMerger(channels);
          splitFilters.push(channelSplitterNode);
          for (let idx = 0; idx < channels; idx++) {
            const gainNode = backendAc.createGain();
            channelSplitterNode.connect(gainNode, idx);
            gainNode.gain.value = 1;
            gainNode.connect(channelMergerNode, 0, idx);
            splitFilters.push(gainNode);
            gainNodes.push(gainNode);
          }
          setChannelGains(gainNodes);
          splitFilters.push(channelMergerNode);
        }

        // Connect filters to wavesurfer
        wavesurfer.instance.backend.setFilters([..._filters, ...splitFilters]);
        setFilters(_filters);
      }
    }, []);

    useEffect(() => {
      if (wavesurfer) {
        wavesurfer.instance.on("ready", createFilters);
        return () => {
          try {
            // @ts-expect-error ignore
            wavesurfer.instance.backend.disconnectFilters();
          } catch (e) {
            //
          }
        };
      }
    }, [wavesurfer]);

    const updateFilters = useCallback(
      (index: number, value: number) => {
        const f = [...filters];
        f[index].gain.value = ~~value;
        setFilters([...f]);
      },
      [filters]
    );

    const reset = useCallback(() => {
      setFilters(
        filters.map((f: AnyObject) => {
          f.gain.value = 0;
          return f;
        })
      );
    }, [filters]);

    const resetFrequency = useCallback(
      (fq: "speech" | "back") => {
        const isSpeech = fq === "speech";
        setFilters(
          filters.map((f: AnyObject) => {
            if (f.frequency.value === EQ_FREQUENCY[0]) {
              f.gain.value = isSpeech ? -40 : 0;
            }
            if (f.frequency.value === EQ_FREQUENCY[1]) {
              f.gain.value = isSpeech ? -30 : 10;
            }
            if (f.frequency.value === EQ_FREQUENCY[2]) {
              f.gain.value = isSpeech ? -20 : 30;
            }
            if (f.frequency.value === EQ_FREQUENCY[3]) {
              f.gain.value = isSpeech ? 0 : 10;
            }
            if (f.frequency.value === EQ_FREQUENCY[4]) {
              f.gain.value = isSpeech ? 20 : -20;
            }
            if (f.frequency.value === EQ_FREQUENCY[5]) {
              f.gain.value = isSpeech ? 20 : -40;
            }
            if (f.frequency.value === EQ_FREQUENCY[6]) {
              f.gain.value = isSpeech ? 20 : -40;
            }
            if (f.frequency.value === EQ_FREQUENCY[7]) {
              f.gain.value = isSpeech ? 20 : -20;
            }
            if (f.frequency.value === EQ_FREQUENCY[8]) {
              f.gain.value = isSpeech ? 0 : 10;
            }
            if (f.frequency.value === EQ_FREQUENCY[9]) {
              f.gain.value = isSpeech ? -20 : 30;
            }
            if (f.frequency.value === EQ_FREQUENCY[10]) {
              f.gain.value = isSpeech ? -30 : 10;
            }
            if (f.frequency.value === EQ_FREQUENCY[11]) {
              f.gain.value = isSpeech ? -40 : 0;
            }
            return f;
          })
        );
      },
      [filters]
    );

    const toggleChannel = useCallback(
      (channel: number, value: number) => {
        if (channelGains != null) {
          const filter = channelGains[channel];
          filter.gain.value = value / 100;
          setChannelGains([...channelGains]);
        }
      },
      [channelGains]
    );

    return isVisible ? (
      <div className="ax-audio__equalizers">
        {channelGains != null && (
          <Fragment>
            {channelGains.map((gainNode, idx) => (
              <EqSlider
                forChannel
                index={idx}
                key={idx}
                label={
                  <AxIcon
                    size="1.25rem"
                    onClick={() =>
                      toggleChannel(idx, gainNode.gain.value > 0 ? 0 : 100)
                    }
                    icon={Icons.iconChannel}
                    color={wavesurfer.instance.getProgressColor(idx)}
                  />
                }
                value={gainNode.gain.value * 100}
                onChange={toggleChannel}
                color={wavesurfer.instance.getProgressColor(idx)}
              />
            ))}

            <AxDivider vertical />
          </Fragment>
        )}
        {filters.map((filter: AnyObject, index: number) => (
          <EqSlider
            key={index}
            index={index}
            label={filter.name}
            value={filter.gain.value}
            onChange={updateFilters}
          />
        ))}
        <AxDivider vertical />
        <div style={{ width: 196 }} className="self-center">
          <AxText className="text-muted text-sm text-center">Presets</AxText>
          <AxButton fullWidth onClick={() => resetFrequency("speech")}>
            Speech
          </AxButton>
          <AxButton fullWidth onClick={() => resetFrequency("back")}>
            Background Noise
          </AxButton>
          <AxButton fullWidth onClick={reset} color="danger">
            Reset
          </AxButton>
        </div>
      </div>
    ) : null;
  }
);
Equalizers.displayName = "AxAudio.Equalizers";
