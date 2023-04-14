/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { getBox } from "@axux/utilities";
import {
  type FC,
  type HTMLAttributes,
  memo,
  type Reducer,
  type RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
} from "react";

interface BoxObject {
  box?: string | number[];
  polygon?: string[] | number[][];
  colorTop?: string;
  colorBottom?: string;
  labelTop?: string;
  labelBottom?: string;
  stroke?: string;
  fill?: string;
}

export interface CanvasRef {
  clear: () => void;
  unhilight: () => void;
  drawBox: (
    boundingBox: BoxObject["box"],
    options?: Omit<BoxObject, "box" | "polygon">
  ) => void;
  drawPolygon: (
    boundingBox: BoxObject["polygon"],
    options?: Omit<BoxObject, "box" | "polygon">
  ) => void;
  hilightBox: (boundingBox: BoxObject["box"]) => void;
  hilightPolygon: (boundingBox: BoxObject["polygon"]) => void;
}

export interface CanvasProps {
  canvas: RefObject<CanvasRef | null>;
  media: RefObject<HTMLImageElement | HTMLVideoElement | null>;
  style: HTMLAttributes<HTMLCanvasElement>["style"];
}

export const Canvas: FC<CanvasProps> = memo(
  ({ style, media, canvas }: CanvasProps) => {
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
      if (mediaEl instanceof HTMLVideoElement) {
        ratio = Math.min(
          mediaEl.offsetWidth / mediaEl.videoWidth,
          mediaEl.offsetHeight / mediaEl.videoHeight
        );
      }
      return ratio;
    }, [media, style]);

    const hilightArea = useCallback(
      (box: BoxObject["box"], strokeColor?: string) => {
        const ratio = getRatio();
        const context = canvasRef.current?.getContext("2d");
        if (context != null) {
          const [x, y, w, h] = getBox(box);
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context.fillStyle = "rgb(0 0 0 / 0.5)";
          context.globalCompositeOperation = "overlay";
          context.fillRect(0, 0, context.canvas.width, context.canvas.height);
          context.clearRect(x * ratio, y * ratio, w * ratio, h * ratio);
          context.lineWidth = 1;
          context.strokeStyle = strokeColor ?? "#fc0";
          context.strokeRect(x * ratio, y * ratio, w * ratio, h * ratio);
        }
      },
      []
    );

    const hilightPolygon = useCallback(
      (polygon: BoxObject["polygon"], strokeColor?: string) => {
        const ratio = getRatio();
        const context = canvasRef.current?.getContext("2d");
        if (context != null && polygon != null) {
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);

          context.fillStyle = "#333333CC";
          context.fillRect(0, 0, context.canvas.width, context.canvas.height);

          context.globalCompositeOperation = "destination-out";
          context.lineWidth = 1;
          context.beginPath();
          polygon.forEach((box, i) => {
            const [x, y] = getBox(box);
            i === 0 && context.moveTo(x * ratio, y * ratio);
            i > 0 && context.lineTo(x * ratio, y * ratio);
          });
          context.closePath();
          context.stroke();
          context.fill();
          context.globalCompositeOperation = "source-over";

          context.lineWidth = 1;
          context.strokeStyle = strokeColor ?? "#fc0";
          context.beginPath();
          polygon.forEach((box, i) => {
            const [x, y] = getBox(box);
            i === 0 && context.moveTo(x * ratio, y * ratio);
            i > 0 && context.lineTo(x * ratio, y * ratio);
          });
          context.closePath();
          context.stroke();
        }
      },
      []
    );

    const [objects, dispatch] = useReducer<Reducer<BoxObject[], AnyObject>>(
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
        if (action.type === "hilightPolygon") {
          hilightPolygon(action.payload);
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
          drawPolygon: (polygon, options = {}) => {
            dispatch({ type: "drawBox", payload: { polygon, ...options } });
          },
          hilightBox: (box) => {
            dispatch({ type: "hilight", payload: box });
          },
          hilightPolygon: (polygon) => {
            dispatch({ type: "hilightPolygon", payload: polygon });
          },
        };
      },
      [canvasRef, dispatch]
    );

    useEffect(() => {
      const context = canvasRef.current?.getContext("2d");
      context?.clearRect(0, 0, context.canvas.width, context.canvas.height);
      const ratio = getRatio();
      if (context != null) {
        objects.forEach(({ box, polygon, ...options }) => {
          if (box) {
            let [x, y, w, h] = getBox(box);
            x *= ratio;
            y *= ratio;
            w *= ratio;
            h *= ratio;
            context.lineWidth = 2;
            context.strokeStyle = options?.stroke ?? "#fc0";
            context.strokeRect(x, y, w, h);
            if (options.labelTop) {
              const labelX = x - 1;
              let labelY = y - 18;
              if (labelY < 0) labelY += 18;
              context.fillStyle = options.colorTop ?? "rgb(0 0 0 / 0.5)";
              context.fillRect(labelX, labelY, w + 2, 18);
              context.fillStyle = "#ffffff";
              context.font = "13px sans-serif";
              context.globalCompositeOperation = "screen";
              context.fillText(
                `${options.labelTop}`,
                labelX + 2,
                labelY + 15,
                w - 4
              );
            }
            context.globalCompositeOperation = "source-over";
            if (options.labelBottom) {
              const labelX = x - 1;
              let labelY = y + h;
              if (labelY > context.canvas.height) labelY -= 18;
              context.fillStyle = options.colorBottom ?? "rgb(0 0 0 / 0.5)";
              context.fillRect(labelX, labelY, w + 2, 18);
              context.fillStyle = "#ffffff";
              context.font = "13px sans-serif";
              context.globalCompositeOperation = "screen";
              context.fillText(
                `${options.labelBottom}`,
                labelX + 2,
                labelY + 15,
                w - 4
              );
            }
            context.globalCompositeOperation = "source-over";
          }
          if (polygon != null) {
            context.lineWidth = 2;
            context.strokeStyle = options?.stroke ?? "#fc0";
            context.beginPath();
            polygon.forEach((box, i) => {
              const [x, y] = getBox(box);
              i === 0 && context.moveTo(x * ratio, y * ratio);
              i > 0 && context.lineTo(x * ratio, y * ratio);
            });
            context.closePath();
            context.stroke();
          }
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
  }
);
Canvas.displayName = "AxMedia.Canvas";
