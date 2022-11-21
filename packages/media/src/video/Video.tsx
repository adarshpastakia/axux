/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAnimation, AxIcon } from "@axux/core";
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

export interface VideoProps {
  src: string;
  poster?: string;
  isNsfw: boolean;
  isFit: boolean;
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
    onLoad,
    onError,
    onChange,
  }: VideoProps) => {
    const overlayRef = useRef<HTMLElement>(null);
    const [style, setStyle] = useState({ width: 0, height: 0 });
    const [isSeeking, setSeeking] = useState(false);

    /** ***************** handle resize *******************/
    const resizeHandler = useCallback(() => {
      videoRef.current != null &&
        setStyle({
          width: videoRef.current.offsetWidth,
          height: videoRef.current.offsetHeight,
        });
    }, []);

    useEffect(() => {
      if (videoRef.current != null) {
        const ob = new ResizeObserver(resizeHandler);
        ob.observe(videoRef.current);

        return () => {
          ob.disconnect();
        };
      }
    }, []);

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
        >
          {showVtt && <track src={vttSrc} default />}
        </video>
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
Video.displayName = "AxVideo.Video";
