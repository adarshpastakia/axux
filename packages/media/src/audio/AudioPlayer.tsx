/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { HotKeyWrapper } from "@axux/core/dist/hotkeys/HotKeyWrapper";
import {
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  useTransition,
} from "react";
import { Icons } from "../types/icons";
import { Loading } from "./Loading";
import { Tools } from "./Tools";
import { Wavesurfer, WavesurferInstance } from "./wavesurfer";

interface PlayerState {
  isErrored: boolean;
  isLoading: boolean;
  isPlaying: boolean;
}

interface PlayerActions {
  type: "init" | "loaded" | "errored" | "play" | "pause";
  payload?: AnyObject;
}

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
  playRegion: (start: number, end: number) => void;
}

export interface AudioPlayerProps {
  ref?: RefObject<AudioPlayerRef | null>;
  /**
   * audio src url
   */
  src: string;
  /**
   * channel colors
   */
  colors?: Array<[wave: string, progress: string]>;
  /**
   * scene list
   */
  regions?: Array<{ id: string; start: number; end: number; channel?: number }>;
  /**
   * onChange playback time
   */
  onChange?: (currentTime: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onRegionStart?: (id: string) => void;
  onRegionEnd?: (id: string) => void;
  onLoad?: () => void;
  onError?: () => void;
}

export const AxAudioPlayer = forwardRef<
  AudioPlayerRef | null,
  AudioPlayerProps
>(
  (
    {
      src,
      regions = [],
      colors,
      onLoad,
      onError,
      onChange,
      onPause,
      onPlay,
      onRegionStart,
      onRegionEnd,
    }: AudioPlayerProps,
    ref
  ) => {
    const [, startTransition] = useTransition();

    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [wavesurfer, setWavesurfer] = useState<WavesurferInstance>();

    const initState = useCallback(
      () =>
        ({
          isLoading: true,
          isErrored: false,
          isPlaying: false,
        } as AnyObject),
      []
    );

    const reducer = useCallback(
      (state: PlayerState, action: PlayerActions) => {
        if (action.type === "init") {
          state = initState();
        }
        if (action.type === "loaded") {
          state.isLoading = false;
          state.isErrored = false;
        }
        if (action.type === "errored") {
          state.isErrored = true;
          state.isLoading = false;
        }
        if (action.type === "play") {
          state.isPlaying = true;
        }
        if (action.type === "pause") {
          state.isPlaying = false;
        }
        return { ...state };
      },
      [initState]
    );

    const [state, dispatch] = useReducer(
      reducer,
      {
        isLoading: false,
        isErrored: false,
        isPlaying: false,
      },
      initState
    );

    useImperativeHandle(
      ref,
      () => ({
        play: () => undefined,
        pause: () => undefined,
        playRegion: (start, end) => undefined,
      }),
      []
    );

    /** ***************** initialize wavesurfer *******************/
    useEffect(() => {
      const surfer = Wavesurfer(
        containerRef.current as HTMLElement,
        timelineRef.current as HTMLElement
      );
      setWavesurfer(surfer);
      return () => {
        surfer.destroy();
      };
    }, []);

    /** ***************** handle load *******************/
    useEffect(() => {
      if (wavesurfer != null) {
        const handler = () => {
          dispatch({ type: "loaded" });
          startTransition(() => onLoad?.());
        };
        wavesurfer.instance.on("ready", handler);

        return () => {
          wavesurfer.instance.un("ready", handler);
        };
      }
    }, [wavesurfer, onLoad]);

    /** ***************** handle error *******************/
    useEffect(() => {
      if (wavesurfer != null) {
        const handler = () => {
          dispatch({ type: "errored" });
          startTransition(() => onError?.());
        };
        wavesurfer.instance.on("error", handler);

        return () => {
          wavesurfer.instance.un("error", handler);
        };
      }
    }, [wavesurfer, onError]);

    /** ***************** handle play *******************/
    useEffect(() => {
      if (wavesurfer != null) {
        const handler = () => {
          dispatch({ type: "play" });
          startTransition(() => onPlay?.());
        };
        wavesurfer.instance.on("play", handler);

        return () => {
          wavesurfer.instance.un("play", handler);
        };
      }
    }, [wavesurfer, onPlay]);

    /** ***************** handle pause *******************/
    useEffect(() => {
      if (wavesurfer != null) {
        const handler = () => {
          dispatch({ type: "pause" });
          startTransition(() => onPause?.());
        };
        wavesurfer.instance.on("pause", handler);

        return () => {
          wavesurfer.instance.un("pause", handler);
        };
      }
    }, [wavesurfer, onPause]);

    /** ***************** handle region in/out *******************/
    useEffect(() => {
      if (wavesurfer != null) {
        const handleIn = (region: KeyValue) => {
          startTransition(() => onRegionStart?.(region.id));
        };
        const handleOut = (region: KeyValue) => {
          startTransition(() => onRegionEnd?.(region.id));
        };
        wavesurfer.instance.on("region-in", handleIn);
        wavesurfer.instance.on("region-out", handleOut);

        return () => {
          wavesurfer.instance.un("region-in", handleIn);
          wavesurfer.instance.un("region-out", handleOut);
        };
      }
    }, [wavesurfer, onRegionStart, onRegionEnd]);

    /** ***************** colors change *******************/
    useLayoutEffect(() => {
      if (wavesurfer != null) {
        wavesurfer.setColors(colors);
      }
    }, [wavesurfer, colors]);

    /** ***************** regions change *******************/
    useLayoutEffect(() => {
      if (wavesurfer?.instance.isReady) {
        wavesurfer.setRegions(regions);
      } else {
        wavesurfer?.instance.once("ready", () => {
          wavesurfer.setRegions(regions);
        });
      }
    }, [wavesurfer, regions]);

    /** ***************** source change *******************/
    useLayoutEffect(() => {
      if (wavesurfer != null) {
        dispatch({ type: "init" });
        startTransition(() => {
          void wavesurfer.loadAudio(src);
        });
      }
    }, [src, wavesurfer]);

    return (
      <HotKeyWrapper>
        <div
          className="ax-media ax-audio"
          data-error={state.isErrored}
          onContextMenuCapture={(e) => e.preventDefault()}
        >
          <div className="ax-audio__container" ref={containerRef} />
          <div className="ax-audio__timeline" ref={timelineRef} />
          {wavesurfer != null && (
            <Tools
              isDisabled={state.isErrored || state.isLoading}
              isPlaying={state.isPlaying}
              wavesurfer={wavesurfer}
            />
          )}

          {state.isLoading && wavesurfer != null && (
            <div className="ax-media__overlay">
              <Loading wavesurfer={wavesurfer} />
            </div>
          )}
          {state.isErrored && (
            <div className="ax-media__overlay">
              <AxIcon size={48} icon={Icons.iconAudio} />
            </div>
          )}
        </div>
      </HotKeyWrapper>
    );
  }
);
AxAudioPlayer.displayName = "AxAudio.Player";
