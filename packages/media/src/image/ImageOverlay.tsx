/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { useIsRtl } from "@axux/core/dist/hooks/useIsRtl";
import { useResize } from "@axux/core/dist/hooks/useResize";
import {
  Fragment,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type ReactEventHandler,
} from "react";
import { Icons } from "../types/icons";

export interface OverlayProps {
  src: string;
  width: number;
  height: number;
  rotate: number;
  onLoad: ReactEventHandler;
  onError: ReactEventHandler;
  containerWidth?: number;
  containerHeight?: number;
}

export const ImageOverlay: FC<OverlayProps> = memo(
  ({
    src,
    width,
    height,
    rotate,
    onLoad,
    onError,
    containerHeight = 0,
    containerWidth = 0,
  }: OverlayProps) => {
    const isRtl = useIsRtl();
    const [overlaySize, setOverlaySize] = useState<number>(containerHeight / 2);
    const overlayRef = useRef<HTMLDivElement>(null);
    const resizeHandleRef = useRef<HTMLDivElement>(null);
    const [orientVertical, setOrientVertical] = useState(true);
    useResize(
      resizeHandleRef,
      ({ x, y }) => {
        if (overlayRef.current != null) {
          orientVertical
            ? setOverlaySize(overlayRef.current.offsetHeight + y)
            : setOverlaySize(overlayRef.current.offsetWidth + x);
        }
      },
      { isVertical: orientVertical }
    );

    const style = useMemo(
      () =>
        ({
          "--rotate": `${rotate}deg`,
          width: rotate % 180 === 0 ? width : height,
          height: rotate % 180 === 0 ? height : width,
        } as AnyObject),
      [height, width, rotate]
    );

    const togglePos = useMemo(() => {
      const approx = Math.max(
        6,
        Math.min(overlaySize, orientVertical ? containerHeight : containerWidth)
      );
      return isNaN(approx) ? 0 : approx;
    }, [orientVertical, containerHeight, containerWidth, overlaySize]);

    useEffect(() => {
      const approx = (orientVertical ? containerHeight : containerWidth) / 2;
      setOverlaySize(isNaN(approx) ? 0 : approx);
    }, [orientVertical, containerHeight, containerWidth]);

    return (
      <Fragment>
        <div
          className="ax-image__overlay"
          ref={overlayRef}
          style={{
            maxHeight: containerHeight,
            maxWidth: containerWidth,
            height: orientVertical ? overlaySize : undefined,
            width: !orientVertical ? overlaySize : undefined,
          }}
        >
          <div
            style={{
              height: containerHeight,
              width: containerWidth,
            }}
          >
            <div style={{ width, height }}>
              <img
                alt="overlay"
                src={src}
                style={style}
                onLoad={onLoad}
                onError={onError}
              />
            </div>
          </div>
          <div
            className="ax-image__overlay--handle"
            data-orient={orientVertical ? "vertical" : "horizontal"}
            ref={resizeHandleRef}
          />
        </div>
        <div
          className="ax-image__overlay--orient"
          style={{
            top: orientVertical ? togglePos : undefined,
            [isRtl ? "right" : "left"]: !orientVertical ? togglePos : undefined,
          }}
        >
          <AxIcon
            icon={Icons.iconOrient}
            data-orient={orientVertical ? "vertical" : "horizontal"}
            onClick={() => setOrientVertical(!orientVertical)}
          />
        </div>
      </Fragment>
    );
  }
);
ImageOverlay.displayName = "AxImage.Overlay";
