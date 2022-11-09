/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAnimation, AxIcon, useResizeObserver } from "@axux/core";
import {
  FC,
  memo,
  ReactEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas, CanvasRef } from "../canvas/Canvas";
import { Icons } from "../types/icons";

export interface ImageProps {
  src: string;
  poster?: string;
  isNsfw: boolean;
  isFit: boolean;
  isPlaying: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<CanvasRef>;
  onLoad: ReactEventHandler;
  onError: ReactEventHandler;
}

export const Video: FC<ImageProps> = memo(
  ({
    src,
    poster,
    videoRef,
    canvasRef,
    isPlaying,
    isFit,
    isNsfw,
    onLoad,
    onError,
  }) => {
    const overlayRef = useRef<HTMLElement>(null);
    const [style, setStyle] = useState({ width: 0, height: 0 });
    const [isSeeking, setSeeking] = useState(false);

    /******************* handle resize *******************/
    const resizeHandler = useCallback(() => {
      videoRef.current &&
        setStyle({
          width: videoRef.current.offsetWidth,
          height: videoRef.current.offsetHeight,
        });
    }, []);
    const containerRef = useResizeObserver(resizeHandler);

    useEffect(() => {
      overlayRef.current && (overlayRef.current.dataset.show = "true");
      setTimeout(() => {
        overlayRef.current && (overlayRef.current.dataset.show = "false");
      }, 400);
    }, [isPlaying]);

    const handleSeek = useCallback(() => {
      setSeeking(!!videoRef.current?.seeking);
    }, []);

    return (
      <div className="ax-video__container" ref={containerRef}>
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
          onError={onError}
        />
        <Canvas canvas={canvasRef} media={videoRef} style={style} />

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
