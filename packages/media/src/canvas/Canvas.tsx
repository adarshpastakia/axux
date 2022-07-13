/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { getBox } from "@axux/utilities";
import {
  FC,
  HTMLAttributes,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
} from "react";

interface BoxObject {
  box: string | number[];
  colorTop?: string;
  colorBottom?: string;
  labelTop?: string;
  labelBottom?: string;
  stroke?: string;
  fill?: string;
}

export interface CanvasRef {
  clear: () => void;
  drawBox: (
    boundingBox: BoxObject["box"],
    options?: Omit<BoxObject, "box">
  ) => void;
  unhilight: () => void;
  hilightBox: (boundingBox: string | number[]) => void;
}

export interface CanvasProps {
  canvas: RefObject<CanvasRef | null>;
  media: RefObject<HTMLImageElement | HTMLVideoElement | null>;
  style: HTMLAttributes<HTMLCanvasElement>["style"];
}

export const Canvas: FC<CanvasProps> = memo(({ style, media, canvas }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getRatio = useCallback(() => {
    const mediaEl = media.current;
    let ratio = 1;
    if (mediaEl instanceof HTMLImageElement) {
      ratio = Math.min(
        mediaEl.width / mediaEl.naturalWidth,
        mediaEl.height / mediaEl.naturalHeight
      );
    }
    return ratio;
  }, [media, style]);

  const hilightArea = useCallback((box: string | number[]) => {
    const ratio = getRatio();
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      const [x, y, w, h] = getBox(box);
      context?.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = "rgb(0 0 0 / 0.5)";
      context.globalCompositeOperation = "overlay";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      context.clearRect(x * ratio, y * ratio, w * ratio, h * ratio);
    }
  }, []);

  const [objects, dispatch] = useReducer(
    (state: BoxObject[], action: KeyValue) => {
      if (action.type === "clear") {
        return [];
      }
      if (action.type === "unhilight") {
        return [...state];
      }
      if (action.type === "drawBox") {
        return [...state, action.payload];
      }
      if (action.type === "hilight") {
        hilightArea(action.payload);
      }
      return state;
    },
    [] as BoxObject[]
  );

  useImperativeHandle(
    canvas,
    () => {
      return {
        clear: () => {
          dispatch({ type: "clear" });
        },
        unhilight: () => {
          dispatch({ type: "unhilight" });
        },
        drawBox: (box, options = {}) => {
          dispatch({ type: "drawBox", payload: { box, ...options } });
        },
        hilightBox: (box) => {
          dispatch({ type: "hilight", payload: box });
        },
      };
    },
    [canvasRef, dispatch]
  );

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    context?.clearRect(0, 0, context.canvas.width, context.canvas.height);
    const ratio = getRatio();
    if (context) {
      objects.forEach(({ box, ...options }) => {
        const [x, y, w, h] = getBox(box);
        context.lineWidth = 3;
        context.strokeStyle = options?.stroke ?? "#fc0";
        context.strokeRect(x * ratio, y * ratio, w * ratio, h * ratio);
      });
    }
  }, [objects, getRatio]);

  return (
    <canvas
      style={style}
      ref={canvasRef}
      width={style?.width}
      height={style?.height}
    />
  );
});
