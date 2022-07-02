/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { forwardRef, HTMLAttributes, RefObject } from "react";

export interface CanvasRef {
  clear: () => void;
  drawBox: (
    boundingBox: string | number[],
    options?: {
      colorTop?: string;
      colorBottom?: string;
      labelTop?: string;
      labelBottom?: string;
      stroke?: string;
      fill?: string;
    }
  ) => void;
}

export interface CanvasProps {
  ref: RefObject<CanvasRef | null>;
  media: RefObject<HTMLImageElement | HTMLVideoElement | null>;
  style: HTMLAttributes<HTMLCanvasElement>["style"];
}

export const Canvas = forwardRef<CanvasRef, CanvasProps>(({ style }, ref) => {
  return <canvas style={style} />;
});
