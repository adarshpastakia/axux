/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAnimation, AxIcon } from "@axux/core";
import { ElementProps } from "@axux/core/dist/types";
import { getImageColorset } from "@axux/utilities/dist/getImageColorset";
import {
  FC,
  memo,
  MouseEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { NsfwOverlay } from "../nsfw/NsfwOverlay";

export interface ThumbnailProps extends ElementProps {
  /**
   * thumbnail source
   */
  src?: string;
  /**
   * fallback image
   */
  fallback?: string;
  /**
   * thumbnail width
   */
  width?: number | string;
  /**
   * thumbnail height
   */
  height?: number | string;
  /**
   * show video reel
   */
  showReel?: boolean;
  /**
   * show overlay for NSFW content
   */
  isNsfw?: boolean;
}

export const AxThumbnail: FC<ThumbnailProps> = memo(
  ({
    src: _src,
    height,
    width,
    showReel,
    className,
    fallback,
    isNsfw,
    ...rest
  }: ThumbnailProps) => {
    const [src, setSrc] = useState<string>();
    const [, startTransition] = useTransition();
    const [isLoading, setLoading] = useState(true);
    const [isErrored, setErrored] = useState(0);

    useEffect(() => {
      setSrc("");
      startTransition(() => {
        setErrored(0);
        setLoading(true);
        setSrc(_src);
      });
    }, [_src]);

    const reload = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        startTransition(() => {
          setErrored(0);
          setLoading(true);
          setSrc(_src);
        });
      },
      [_src]
    );

    const loadHandler = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.dataset.colorset = getImageColorset(e.currentTarget);
      startTransition(() => {
        setLoading(false);
      });
    }, []);
    const handleError = useCallback(() => {
      startTransition(() => {
        if (isErrored === 1) {
          setErrored(2);
          setLoading(false);
        } else {
          setErrored(1);
          setSrc(fallback);
        }
      });
    }, [isErrored, fallback]);

    return (
      <div
        {...rest}
        data-reel={showReel}
        style={{ width, height }}
        data-fallback={isErrored !== 0}
        className={`ax-thumbnail ${className ?? ""}`}
      >
        {isErrored !== 2 && (
          <img
            src={src}
            loading="lazy"
            crossOrigin="anonymous"
            onLoad={loadHandler}
            onError={src ? handleError : undefined}
          />
        )}
        {isErrored === 2 && (
          <AxIcon
            onClick={reload}
            className="ax-thumbnail--reload"
            icon="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"
          />
        )}
        {isLoading && (
          <div className="ax-thumbnail--spinner">
            <AxAnimation.Spinner />
          </div>
        )}
        {isNsfw && <NsfwOverlay isNsfw={isNsfw} />}
      </div>
    );
  }
);
AxThumbnail.displayName = "AxThumbnail";
