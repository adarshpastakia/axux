/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxDivider, AxHotKey, AxIcon } from "@axux/core";
import { Format } from "@axux/utilities";
import {
  FC,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TimeSlider } from "../timeslider/TimeSlider";
import { Icons } from "../types/icons";

export interface ToolsProps {
  isFit: boolean;
  isPlaying: boolean;
  isDisabled: boolean;
  showVtt: boolean;
  hasVtt: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  markers?: Array<[time: number, score: number]>;
  onToggleFit: () => void;
  onToggleSrt: () => void;
}

/*
, + 2sec
. + 2sec
Shift+, -5frames (0.165 secs)
Shift+. +5frames (0.165 secs)
*/

export const Tools: FC<ToolsProps> = memo(
  ({
    isPlaying,
    isDisabled,
    videoRef,
    isFit,
    markers = [],
    onToggleFit,
    onToggleSrt,
    showVtt,
    hasVtt,
  }: ToolsProps) => {
    const [time, setTime] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [volume, setVolume] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
      const timeChange = () => setTime(videoRef.current?.currentTime ?? 0);
      const speedChange = () => setSpeed(videoRef.current?.playbackRate ?? 1);
      const volumeChange = () => setVolume(videoRef.current?.volume ?? 0.5);
      const durationChange = () => setDuration(videoRef.current?.duration ?? 0);
      const reset = () => {
        setVolume(videoRef.current?.volume ?? 0.5);
        setSpeed(videoRef.current?.playbackRate ?? 1);
      };

      videoRef.current?.addEventListener("loadedmetadata", reset);
      videoRef.current?.addEventListener("durationchange", durationChange);
      videoRef.current?.addEventListener("timeupdate", timeChange);
      videoRef.current?.addEventListener("ratechange", speedChange);
      videoRef.current?.addEventListener("volumechange", volumeChange);

      return () => {
        videoRef.current?.removeEventListener("loadedmetadata", reset);
        videoRef.current?.removeEventListener("durationchange", durationChange);
        videoRef.current?.removeEventListener("timeupdate", timeChange);
        videoRef.current?.removeEventListener("ratechange", speedChange);
        videoRef.current?.removeEventListener("volumechange", volumeChange);
      };
    }, []);

    const handleSeek = useCallback(
      (newTime = 0) => {
        const time = Math.min(duration, Math.max(0, newTime));
        setTime(time);
        videoRef.current != null && (videoRef.current.currentTime = time);
      },
      [duration]
    );
    const handleVolume = useCallback((newVolume = 0) => {
      const volume = Math.min(1, Math.max(0, newVolume));
      setVolume(volume);
      videoRef.current != null && (videoRef.current.volume = volume);
    }, []);
    const handleSpeed = useCallback((newSpeed = 0) => {
      const speed = Math.min(5, Math.max(0, newSpeed));
      setSpeed(speed);
      videoRef.current != null && (videoRef.current.playbackRate = speed);
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
          handler={() => {
            isPlaying
              ? videoRef.current?.pause()
              : videoRef.current?.play().then();
          }}
        />
        <AxHotKey global keyCombo="f" handler={onToggleFit} />
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
              onClick={() => videoRef.current?.pause()}
            />
          )}
          {!isPlaying && (
            <AxIcon
              className="ax-media__tool"
              icon={Icons.iconPlay}
              onClick={() => {
                void videoRef.current?.play();
              }}
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
          <AxIcon
            data-active={isFit}
            className="ax-media__tool"
            icon={Icons.iconFitToView}
            onClick={onToggleFit}
          />
          {hasVtt && (
            <AxIcon
              data-active={showVtt}
              className="ax-media__tool"
              icon={Icons.iconSrt}
              onClick={onToggleSrt}
            />
          )}
          <AxDivider vertical size="xs" />
          <TimeSlider
            duration={duration}
            time={time}
            markers={markers}
            onChange={handleSeek}
          />
          <label className="ax-video__timeDisplay">
            <span>{Format.duration(time, true)}</span>
            <small>/</small>
            <span>{Format.durationSeconds(duration, true)}</span>
          </label>
        </div>
      </div>
    );
  }
);
Tools.displayName = "AxVideo.Tools";
