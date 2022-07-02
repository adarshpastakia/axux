/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC, ReactEventHandler, RefObject, useMemo } from "react";
import { Canvas, CanvasRef } from "../canvas/Canvas";

export interface ImageProps {
  src: string;
  imageRef: RefObject<HTMLImageElement>;
  canvasRef: RefObject<CanvasRef>;
  onLoad: ReactEventHandler;
  onError: ReactEventHandler;
  width: number;
  height: number;
  rotate: number;
}

export const Image: FC<ImageProps> = ({
  src,
  imageRef,
  canvasRef,
  onLoad,
  onError,
  width,
  height,
  rotate,
}) => {
  const startDrag = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    let startX = e.clientX;
    let startY = e.clientY;

    const doDrag = (ev: MouseEvent) => {
      if (target.parentElement) {
        target.parentElement.scrollTop -= Math.floor(ev.clientY - startY);
        target.parentElement.scrollLeft -= Math.floor(ev.clientX - startX);
        startX = ev.clientX;
        startY = ev.clientY;
        ev.preventDefault();
        ev.stopPropagation();
      }
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", doDrag);
      },
      { once: true }
    );
  };

  const style = useMemo(
    () =>
      ({
        "--rotate": `${rotate}deg`,
        width: rotate % 180 === 0 ? width : height,
        height: rotate % 180 === 0 ? height : width,
      } as AnyObject),
    [height, width, rotate]
  );
  return (
    <div
      className="ax-image__container"
      style={{ width, height }}
      onMouseDown={startDrag}
    >
      <img
        ref={imageRef}
        src={src}
        loading="lazy"
        alt="image viewer"
        crossOrigin="anonymous"
        onLoad={onLoad}
        onError={onError}
        style={style}
      />
      <Canvas ref={canvasRef} media={imageRef} style={style} />
    </div>
  );
};
