/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxDivider, AxHotKey, AxIcon } from "@axux/core";
import { Format } from "@axux/utilities";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { TimeSlider } from "../timeslider/TimeSlider";
import { Icons } from "../types/icons";
import { Equalizers } from "./Equalizers";
import { WavesurferInstance } from "./wavesurfer";

export interface ToolsProps {
  isPlaying: boolean;
  isDisabled: boolean;
  wavesurfer: WavesurferInstance;
}

/*
, + 2sec
. + 2sec
Shift+, -5frames (0.165 secs)
Shift+. +5frames (0.165 secs)
*/

export const Tools: FC<ToolsProps> = memo(
  ({ isPlaying, isDisabled, wavesurfer }) => {
    const [time, setTime] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [volume, setVolume] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showEqs, setShowEqs] = useState(false);

    useEffect(() => {
      const timeChange = () =>
        setTime(wavesurfer.instance.getCurrentTime() ?? 0);
      const reset = () => {
        setDuration(wavesurfer.instance.getDuration() ?? 0);
        setVolume(wavesurfer.instance.getVolume() ?? 0.5);
        setSpeed(wavesurfer.instance.getPlaybackRate() ?? 1);
      };

      wavesurfer.instance.on("audioprocess", timeChange);
      wavesurfer.instance.on("seek", timeChange);
      wavesurfer.instance.on("ready", reset);

      return () => {
        wavesurfer.instance.un("audioprocess", timeChange);
        wavesurfer.instance.un("seek", timeChange);
        wavesurfer.instance.un("ready", reset);
      };
    }, []);

    const handleSeek = useCallback(
      (newTime = 0) => {
        const time = Math.min(duration, Math.max(0, newTime));
        setTime(time);
        wavesurfer.instance.setCurrentTime(time);
      },
      [duration]
    );
    const handleVolume = useCallback((newVolume = 0) => {
      const volume = Math.min(1, Math.max(0, newVolume));
      setVolume(volume);
      wavesurfer.instance.setVolume(volume);
    }, []);
    const handleSpeed = useCallback((newSpeed = 0) => {
      const speed = Math.min(5, Math.max(0, newSpeed));
      setSpeed(speed);
      wavesurfer.instance.setPlaybackRate(speed);
    }, []);

    const volumeIcon = useMemo(() => {
      if (volume > 0.75) return Icons.iconVolumeFull;
      if (volume > 0.4) return Icons.iconVolumeMedium;
      if (volume > 0) return Icons.iconVolumeLow;
      return Icons.iconVolumeMute;
    }, [volume]);

    return (
      <div className="ax-media__tools" data-disabled={isDisabled}>
        <AxHotKey
          global
          keyCombo="space"
          handler={() =>
            isPlaying ? wavesurfer.instance.pause() : wavesurfer.instance.play()
          }
        />
        <AxHotKey global keyCombo="x" handler={handleVolume} />
        <AxHotKey global keyCombo="," handler={() => handleSeek(time - 5)} />
        <AxHotKey global keyCombo="." handler={() => handleSeek(time + 5)} />
        <AxHotKey
          global
          keyCombo="["
          handler={() => handleSpeed(speed - 0.5)}
        />
        <AxHotKey
          global
          keyCombo="]"
          handler={() => handleSpeed(speed + 0.5)}
        />
        <AxHotKey
          global
          keyCombo="-"
          handler={() => handleVolume(volume - 0.1)}
        />
        <AxHotKey
          global
          keyCombo="="
          handler={() => handleVolume(volume + 0.1)}
        />
        <AxHotKey
          global
          keyCombo="shift+<"
          handler={() => handleSeek(time - 0.165)}
        />
        <AxHotKey
          global
          keyCombo="shift+>"
          handler={() => handleSeek(time + 0.165)}
        />

        <div className="toolbar">
          {isPlaying && (
            <AxIcon
              className="ax-media__tool"
              icon={Icons.iconPause}
              onClick={() => wavesurfer.instance.pause()}
            />
          )}
          {!isPlaying && (
            <AxIcon
              className="ax-media__tool"
              icon={Icons.iconPlay}
              onClick={() => wavesurfer.instance.play()}
            />
          )}
          <AxDivider vertical size="xs" />
          <AxIcon
            className="ax-media__tool"
            icon={volumeIcon}
            onClick={() =>
              handleVolume(volume === 1 ? 0 : volume >= 0.5 ? 1 : 0.5)
            }
          />
          <div className="ax-media__slider--mini">
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => handleVolume(e.currentTarget.valueAsNumber)}
            />
          </div>
          <AxIcon
            className="ax-media__tool text-icon"
            icon={`${speed.toFixed(1)}x`}
            onClick={() => handleSpeed(1)}
          />
          <div className="ax-media__slider--mini">
            <input
              type="range"
              min={0.5}
              max={5}
              step={0.5}
              value={speed}
              onChange={(e) => handleSpeed(e.currentTarget.valueAsNumber)}
            />
          </div>
          <AxDivider vertical size="xs" />
          <TimeSlider duration={duration} time={time} onChange={handleSeek} />
          <label className="ax-video__timeDisplay">
            <span>{Format.duration(time, true)}</span>
            <small>/</small>
            <span>{Format.durationSeconds(duration, true)}</span>
          </label>
          <AxDivider vertical size="xs" />
          <AxIcon
            data-active={showEqs}
            className="ax-media__tool"
            icon={Icons.iconEqs}
            onClick={() => setShowEqs(!showEqs)}
          />
        </div>
        <Equalizers isVisible={showEqs} wavesurfer={wavesurfer} />
      </div>
    );
  }
);
