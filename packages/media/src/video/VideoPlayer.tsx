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
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useTransition,
  type ReactEventHandler,
  type RefObject,
  type SyntheticEvent,
} from "react";
import { type CanvasRef } from "../canvas/Canvas";
import { Video } from "./Video";

import { isEmpty } from "@axux/utilities";
import { NsfwOverlay } from "../nsfw/NsfwOverlay";
import { Icons } from "../types/icons";
import { SceneList } from "./SceneList";
import { Tools } from "./Tools";

interface PlayerState {
  width: number;
  height: number;
  rotate: number;
  isFit: boolean;
  showVtt: boolean;
  isLoading: boolean;
  isPlaying: boolean;
  isErrored: boolean;
}

interface PlayerActions {
  type:
    | "init"
    | "loaded"
    | "errored"
    | "play"
    | "pause"
    | "resize"
    | "rotate"
    | "fit"
    | "vtt";
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
    const containerRef = useRef<HTMLDivElement>(null);

    const [, startTransition] = useTransition();

    const initState = useCallback(
      () =>
        ({
          rotate: 0,
          width: 0,
          height: 0,
          isLoading: true,
          isErrored: false,
          isFit: false,
          showVtt: false,
          isPlaying: false,
        } as AnyObject),
      []
    );

    const calculateSize = useCallback((rotate: number, fitToView: boolean) => {
      const el = containerRef.current;
      const vid = videoRef.current;
      if (el != null && vid && vid.videoWidth) {
        const turn = rotate % 180 !== 0;
        let width = vid.videoWidth;
        let height = vid.videoHeight;
        const containerWidth = turn ? el.offsetHeight : el.offsetWidth;
        const containerHeight = turn ? el.offsetWidth : el.offsetHeight;
        if (fitToView) {
          // if container ratio is more than image ratio height set to container 100%
          if (containerWidth / containerHeight > width / height) {
            width = width * (containerHeight / height);
            height = containerHeight;
          } else {
            height = height * (containerWidth / width);
            width = containerWidth;
          }
        } else {
          width = Math.min(width, containerWidth);
          height = Math.min(height, containerHeight);
        }
        return { width, height };
      }
      return { width: "100%", height: "100%" } as AnyObject;
    }, []);

    const reducer = useCallback(
      (state: PlayerState, action: PlayerActions) => {
        if (action.type === "init") {
          state = initState();
        }
        if (action.type === "loaded") {
          state.isLoading = false;
          state.isErrored = false;
          state = {
            ...state,
            ...calculateSize(state.rotate, state.isFit),
          };
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
          state = {
            ...state,
            ...calculateSize(state.rotate, state.isFit),
          };
        }
        if (action.type === "vtt") {
          state.showVtt = action.payload;
        }
        if (action.type === "rotate") {
          state.rotate =
            action.payload > 270
              ? 0
              : action.payload < 0
              ? 270
              : action.payload;
          state = {
            ...state,
            ...calculateSize(state.rotate, state.isFit),
          };
        }
        if (action.type === "resize") {
          state = {
            ...state,
            ...calculateSize(state.rotate, state.isFit),
          };
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

    const resizeHandler = useCallback(
      (size: KeyValue) => {
        dispatch({ type: "resize" });
      },
      [state.rotate]
    );
    useEffect(() => {
      if (videoRef.current != null) {
        const ob = new ResizeObserver(resizeHandler);
        ob.observe(videoRef.current);

        return () => {
          ob.disconnect();
        };
      }
    }, []);

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
            ref={containerRef}
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
              rotate={state.rotate}
              showVtt={state.showVtt}
              isPlaying={state.isPlaying}
              width={state.width}
              height={state.height}
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
            rotate={state.rotate}
            onRotate={(rotate) => dispatch({ type: "rotate", payload: rotate })}
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
