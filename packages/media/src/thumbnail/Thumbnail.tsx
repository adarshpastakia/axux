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
import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";

export interface ThumbnailProps extends ElementProps {
  src?: string;
  width?: number | string;
  height?: number | string;
  showReel?: boolean;
}

export const AxThumbnail: FC<ThumbnailProps> = ({
  src,
  height,
  width,
  showReel,
  className,
  ...rest
}) => {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => setLoading(true), [src]);
  const loadHandler = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.dataset.colorset = getImageColorset(e.currentTarget);
    setLoading(false);
  }, []);
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
      />
      {isLoading && (
        <div className="ax-thumbnail--spinner">
          <AxAnimation.Spinner />
        </div>
      )}
    </div>
  );
};
