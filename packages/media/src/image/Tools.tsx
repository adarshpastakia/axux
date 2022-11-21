/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxDivider, AxHotKey, AxIcon } from "@axux/core";
import { FC, memo } from "react";
import { Icons } from "../types/icons";
import { ZoomMeter } from "./ZoomMeter";

export interface ToolsProps {
  zoom: number;
  rotate: number;
  isDisabled: boolean;
  disableZoom: boolean;
  onZoom: (zoom: number) => void;
  onRotate: (rotate: number) => void;
}

export const Tools: FC<ToolsProps> = memo(
  ({ zoom, rotate, onZoom, onRotate, isDisabled, disableZoom }: ToolsProps) => {
    const startDrag = (e: React.MouseEvent) => {
      const target = e.currentTarget as HTMLDivElement;
      let startX = e.clientX;
      let zoomStart = zoom || 1;

      const doDrag = (ev: MouseEvent) => {
        if (target.parentElement != null) {
          zoomStart += (startX - ev.clientX) * 0.05;
          onZoom(Math.max(0.1, Math.min(5, zoomStart)));
          startX = ev.clientX;
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

    return (
      <div className="ax-media__tools" data-disabled={isDisabled}>
        <AxHotKey
          global
          keyCombo="f"
          handler={() => !disableZoom && onZoom(0)}
        />
        <AxHotKey
          global
          keyCombo=","
          handler={() => !disableZoom && onZoom(Math.max(zoom - 0.5, 0.5))}
        />
        <AxHotKey
          global
          keyCombo="."
          handler={() => !disableZoom && onZoom(Math.min(zoom + 0.5, 5))}
        />
        <AxHotKey global keyCombo="[" handler={() => onRotate(rotate - 90)} />
        <AxHotKey global keyCombo="]" handler={() => onRotate(rotate + 90)} />
        <div className="toolbar">
          <label className="basis-28 text-end">
            Zoom: {zoom === 0 ? "Fit" : `${zoom.toFixed(1)}x`}
          </label>
          <AxIcon
            className="ax-media__tool"
            icon={Icons.iconFitToView}
            data-disabled={disableZoom}
            onClick={() => onZoom(0)}
          />
          <AxIcon
            className="ax-media__tool"
            icon={Icons.iconAspect}
            data-disabled={disableZoom}
            onClick={() => onZoom(1)}
          />
          <div className="ax-image__zoom" data-disabled={disableZoom}>
            <div className="ax-image__zoomMeter" onMouseDown={startDrag}>
              <ZoomMeter zoom={zoom} />
              <span>{zoom.toFixed(1)}</span>
            </div>
            <AxIcon
              className="ax-media__tool"
              icon={Icons.iconZoomer}
              data-disabled={disableZoom}
              onClick={() => onZoom(zoom > 4.5 ? 0.5 : zoom + 0.5)}
            />
          </div>
          <AxDivider vertical size="sm" />
          <AxIcon
            className="ax-media__tool"
            icon={Icons.iconCrop}
            data-disabled={disableZoom}
          />
          <AxDivider vertical size="sm" />
          <AxIcon
            className="ax-media__tool"
            icon={Icons.iconRotateCCW}
            onClick={() => onRotate(rotate - 90)}
          />
          <AxIcon
            className="ax-media__tool"
            icon={Icons.iconRotateCW}
            onClick={() => onRotate(rotate + 90)}
          />
          <label className="basis-48">Rotate: {rotate}°</label>
        </div>
      </div>
    );
  }
);
Tools.displayName = "AxImage.Tools";
