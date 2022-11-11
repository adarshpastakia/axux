/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAnimation } from "@axux/core";
import { ElementProps } from "@axux/core/dist/types";
import { getImageColorset } from "@axux/utilities/dist/getImageColorset";
import {
  FC,
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

export const AxThumbnail: FC<ThumbnailProps> = ({
  src: _src,
  height,
  width,
  showReel,
  className,
  fallback,
  isNsfw,
  ...rest
}) => {
  const [src, setSrc] = useState<string>();
  const [_, startTransition] = useTransition();
  const [isErrored, setErrored] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setSrc("");
    startTransition(() => {
      setLoading(true);
      setErrored(false);
      setSrc(_src);
    });
  }, [_src]);

  useEffect(() => setLoading(true), [src]);
  const loadHandler = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.dataset.colorset = getImageColorset(e.currentTarget);
    startTransition(() => {
      setLoading(false);
    });
  }, []);
  const handleError = useCallback(() => {
    startTransition(() => {
      setErrored(true);
      setLoading(false);
      setSrc(fallback);
    });
  }, [fallback]);

  return (
    <div
      {...rest}
      data-reel={showReel}
      style={{ width, height }}
      className={`ax-thumbnail ${className ?? ""}`}
    >
      <img
        src={src}
        loading="lazy"
        crossOrigin="anonymous"
        onLoad={loadHandler}
        onError={src ? handleError : undefined}
        className={isErrored ? "bg-component" : ""}
      />
      {isLoading && (
        <div className="ax-thumbnail--spinner">
          <AxAnimation.Spinner />
        </div>
      )}
      {isNsfw && <NsfwOverlay isNsfw={isNsfw} />}
    </div>
  );
};
