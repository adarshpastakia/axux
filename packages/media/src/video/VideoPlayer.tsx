/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAnimation, AxIcon } from "@axux/core";
import { HotKeyWrapper } from "@axux/core/dist/hotkeys/HotKeyWrapper";
import {
  forwardRef,
  type ReactEventHandler,
  type RefObject,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useTransition,
} from "react";
import { type CanvasRef } from "../canvas/Canvas";
import { Video } from "./Video";

import { isEmpty } from "@axux/utilities";
import { NsfwOverlay } from "../nsfw/NsfwOverlay";
import { Icons } from "../types/icons";
import { SceneList } from "./SceneList";
import { Tools } from "./Tools";

interface PlayerState {
  isFit: boolean;
  showVtt: boolean;
  isLoading: boolean;
  isPlaying: boolean;
  isErrored: boolean;
}

interface PlayerActions {
  type: "init" | "loaded" | "errored" | "play" | "pause" | "fit" | "vtt";
  payload?: AnyObject;
}

export interface VideoPlayerRef extends CanvasRef {
  play: () => void;
  playAt: (time: number) => void;
  seek: (time: number) => void;
  pause: () => void;
  currentTime: () => number;
  on: HTMLVideoElement["addEventListener"];
  off: HTMLVideoElement["removeEventListener"];
}

export interface VideoPlayerProps {
  ref?: RefObject<VideoPlayerRef | null>;
  /**
   * video src url
   */
  src: string;
  /**
   * video poster url
   */
  poster?: string;
  /**
   * show overlay for NSFW content
   */
  isNsfw?: boolean;
  /**
   * scene list
   */
  scenes?: Array<[time: number, poster: string]>;
  /**
   * timeline markers
   */
  markers?: Array<[time: number, score: number]>;
  /**
   *
   */
  vttText?: string;
  /**
   * onChange playback time
   */
  onChange?: (currentTime: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onLoad?: ReactEventHandler<HTMLVideoElement>;
  onError?: ReactEventHandler<HTMLVideoElement>;
}

export const AxVideoPlayer = forwardRef<
  VideoPlayerRef | null,
  VideoPlayerProps
>(
  (
    {
      src,
      poster,
      isNsfw,
      vttText,
      markers = [],
      scenes = [],
      onLoad,
      onError,
      onChange,
      onPause,
      onPlay,
    }: VideoPlayerProps,
    ref
  ) => {
    const canvasRef = useRef<CanvasRef>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [, startTransition] = useTransition();

    const initState = useCallback(
      () =>
        ({
          isLoading: true,
          isErrored: false,
          isFit: false,
          showVtt: false,
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
        if (action.type === "fit") {
          state.isFit = action.payload;
        }
        if (action.type === "vtt") {
          state.showVtt = action.payload;
        }
        return { ...state };
      },
      [initState]
    );

    const [state, dispatch] = useReducer(
      reducer,
      {
        loaded: false,
        error: false,
        isFit: false,
        showVtt: false,
        isPlaying: false,
      },
      initState
    );

    useImperativeHandle(
      ref,
      () =>
        canvasRef.current != null
          ? {
              seek: (ts: number) =>
                videoRef.current && (videoRef.current.currentTime = ts),
              play: async () => await videoRef.current?.play(),
              playAt: async (time: number) =>
                await (videoRef.current &&
                ((videoRef.current.currentTime = time),
                videoRef.current?.play())),
              pause: () => videoRef.current?.pause(),
              currentTime: () => videoRef.current?.currentTime,
              on: videoRef.current?.addEventListener.bind(videoRef.current),
              off: videoRef.current?.removeEventListener.bind(videoRef.current),
              ...canvasRef.current,
            }
          : (null as AnyObject),
      []
    );

    useLayoutEffect(() => {
      dispatch({ type: "init" });
      videoRef.current != null && (videoRef.current.volume = 0.5);
      videoRef.current != null && (videoRef.current.playbackRate = 1);
      canvasRef.current?.clear();
    }, [src]);

    const handleLoad = useCallback(
      (e: SyntheticEvent<HTMLVideoElement>) => {
        dispatch({ type: "loaded" });
        startTransition(() => {
          onLoad?.(e);
        });
      },
      [onLoad]
    );
    const handleError = useCallback(
      (e: SyntheticEvent<HTMLVideoElement>) => {
        dispatch({ type: "errored" });
        startTransition(() => onError?.(e));
      },
      [onError]
    );

    const disableTools = useMemo(
      () => state.isLoading || !!state.isErrored,
      [state]
    );

    const handlePlay = useCallback(() => {
      dispatch({ type: "play" });
      startTransition(() => onPlay?.());
    }, [onPlay]);
    const handlePause = useCallback(() => {
      dispatch({ type: "pause" });
      startTransition(() => onPause?.());
    }, [onPause]);
    const handleTimeUpdate = useCallback(() => {
      startTransition(() => onChange?.(videoRef.current?.currentTime ?? 0));
    }, [onChange]);

    useEffect(() => {
      videoRef.current?.addEventListener("play", handlePlay);
      videoRef.current?.addEventListener("pause", handlePause);
      videoRef.current?.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        videoRef.current?.removeEventListener("play", handlePlay);
        videoRef.current?.removeEventListener("pause", handlePause);
        videoRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }, [handlePlay, handlePause, handleTimeUpdate]);

    return (
      <HotKeyWrapper>
        <div
          className="ax-media"
          data-error={state.isErrored}
          onContextMenuCapture={(e) => e.preventDefault()}
        >
          <div
            className="ax-media__container ax-video__wrapper"
            onClick={() => {
              videoRef.current?.paused
                ? videoRef.current?.play()
                : videoRef.current?.pause();
            }}
          >
            <Video
              src={src}
              poster={poster}
              vttText={vttText}
              isFit={state.isFit}
              showVtt={state.showVtt}
              isPlaying={state.isPlaying}
              videoRef={videoRef}
              canvasRef={canvasRef}
              isNsfw={!!isNsfw}
              onLoad={handleLoad}
              onError={handleError}
              onChange={() => onChange?.(videoRef.current?.currentTime ?? 0)}
            />
          </div>

          {scenes?.length > 1 && (
            <SceneList scenes={scenes} videoRef={videoRef} />
          )}

          <Tools
            markers={markers}
            videoRef={videoRef}
            isDisabled={disableTools}
            isPlaying={state.isPlaying}
            isFit={state.isFit}
            showVtt={state.showVtt}
            hasVtt={!isEmpty(vttText)}
            onToggleSrt={() =>
              dispatch({ type: "vtt", payload: !state.showVtt })
            }
            onToggleFit={() => dispatch({ type: "fit", payload: !state.isFit })}
          />

          {state.isLoading && (
            <div className="ax-media__overlay">
              <AxAnimation.Bars />
            </div>
          )}
          {state.isErrored && (
            <div className="ax-media__overlay">
              <AxIcon size={48} icon={Icons.iconVideo} />
            </div>
          )}
          {isNsfw && <NsfwOverlay isNsfw={isNsfw} />}
        </div>
      </HotKeyWrapper>
    );
  }
);
AxVideoPlayer.displayName = "AxVideo.Player";
