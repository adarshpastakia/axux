/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAnimation, AxIcon } from "@axux/core";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactEventHandler,
  type RefObject,
} from "react";
import { Canvas, type CanvasRef } from "../canvas/Canvas";
import { Icons } from "../types/icons";

export interface VideoProps {
  src: string;
  poster?: string;
  isNsfw: boolean;
  isFit: boolean;
  width: number;
  height: number;
  rotate: number;
  showVtt: boolean;
  isPlaying: boolean;
  vttText?: string;
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<CanvasRef>;
  onLoad: ReactEventHandler;
  onError: ReactEventHandler;
  onChange: ReactEventHandler;
}

export const Video: FC<VideoProps> = memo(
  ({
    src,
    poster,
    videoRef,
    canvasRef,
    isPlaying,
    isFit,
    isNsfw,
    showVtt,
    vttText,
    width,
    height,
    rotate,
    onLoad,
    onError,
    onChange,
  }: VideoProps) => {
    const overlayRef = useRef<HTMLElement>(null);
    const [style, setStyle] = useState({ width: 0, height: 0 });
    const [isSeeking, setSeeking] = useState(false);

    /** ***************** handle resize *******************/
    const resizeHandler = useCallback(() => {
      if (videoRef.current != null) {
        const ratio = Math.min(
          videoRef.current.offsetWidth /
            (videoRef.current.videoWidth || videoRef.current.offsetWidth),
          videoRef.current.offsetHeight /
            (videoRef.current.videoHeight || videoRef.current.offsetHeight)
        );
        setStyle({
          width: videoRef.current.videoWidth * ratio,
          height: videoRef.current.videoHeight * ratio,
        });
      }
    }, [isFit]);

    useEffect(() => {
      if (videoRef.current != null) {
        const el = videoRef.current;
        const ob = new ResizeObserver(resizeHandler);
        ob.observe(videoRef.current);
        el.addEventListener("loadedmetadata", resizeHandler);
        return () => {
          ob.disconnect();
          el.removeEventListener("loadedmetadata", resizeHandler);
        };
      }
    }, [resizeHandler]);

    useEffect(() => {
      overlayRef.current != null && (overlayRef.current.dataset.show = "true");
      setTimeout(() => {
        overlayRef.current != null &&
          (overlayRef.current.dataset.show = "false");
      }, 400);
    }, [isPlaying]);

    const handleSeek = useCallback(() => {
      setSeeking(!!videoRef.current?.seeking);
    }, []);

    const [vttSrc, setVtt] = useState<AnyObject>();
    useEffect(() => {
      if (vttText) {
        const vtt = URL.createObjectURL(
          new Blob([vttText], { type: "text/vtt" })
        );
        setVtt(vtt);
        return () => {
          URL.revokeObjectURL(vtt);
        };
      }
    }, [vttText]);

    return (
      <div className="ax-video__container">
        <video
          src={src}
          ref={videoRef}
          poster={poster}
          controls={false}
          autoPlay={!isNsfw}
          data-fit={isFit}
          controlsList="nodownload,nofullscreen"
          preload="metadata"
          crossOrigin="anonymous"
          onSeeking={handleSeek}
          onSeeked={handleSeek}
          onLoadedMetadata={onLoad}
          onTimeUpdate={onChange}
          onError={onError}
          style={
            {
              "--rotate": `${rotate}deg`,
              width,
              height,
            } as AnyObject
          }
        >
          {showVtt && <track src={vttSrc} default />}
        </video>
        <Canvas
          canvas={canvasRef}
          media={videoRef}
          style={{ "--rotate": `${rotate}deg`, ...style } as AnyObject}
        />

        <AxIcon
          icon={isPlaying ? Icons.iconPlay : Icons.iconPause}
          className="ax-video__overlay"
          data-show="false"
          ref={overlayRef}
        />

        {isSeeking && (
          <div className="ax-media__overlay p-1 rounded-full leading-[0]">
            <AxAnimation.Spinner className="text-4xl" />
          </div>
        )}
      </div>
    );
  }
);
Video.displayName = "AxVideo.Video";
