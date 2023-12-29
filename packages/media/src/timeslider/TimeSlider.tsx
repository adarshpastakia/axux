/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useCallback, useEffect, useRef, type FC } from "react";
import ResizeObserver from "resize-observer-polyfill";

interface TimeSliderProps {
  time: number;
  markers?: number[][];
  duration: number;
  onChange: (e: number) => void;
}

export const TimeSlider: FC<TimeSliderProps> = ({
  duration = 0,
  time = 0,
  markers = [],
  onChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawMarkers = useCallback(() => {
    const context = canvasRef.current?.getContext("2d");
    context != null &&
      duration > 0 &&
      markers.forEach((marker) => {
        const [time, size] = marker;
        const { width, height } = context?.canvas;
        const left = (time / duration) * width;
        const h = height * size;
        context && (context.strokeStyle = "#fc0000");
        context?.strokeRect(left, height - h, 1, h);
      });
  }, [markers, duration]);

  useEffect(() => {
    const resize = () => {
      if (canvasRef.current != null) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
        drawMarkers();
      }
    };

    const ob = new ResizeObserver(resize);
    canvasRef.current != null && ob.observe(canvasRef.current);

    return () => {
      ob.disconnect();
    };
  }, [drawMarkers]);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    drawMarkers();
    return () => {
      context?.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };
  }, [drawMarkers]);

  return (
    <div className="ax-media__slider">
      <input
        type="range"
        min={0}
        max={duration}
        step={0.1}
        value={time}
        onChange={(e) => onChange(e.currentTarget.valueAsNumber)}
      />
      <canvas ref={canvasRef} />
    </div>
  );
};
