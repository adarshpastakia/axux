/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { Format } from "@axux/utilities";
import {
  HTMLContainer,
  Rectangle2d,
  ShapeUtil,
  type TLBaseShape,
} from "@tldraw/tldraw";
import domtoimage from "dom-to-image";
import { useEffect, useRef } from "react";

type AudioShape = TLBaseShape<
  "audio-card",
  {
    src: string;
    fileName: string;
    fileSize: number;
  }
>;

export class AudioShapeUtil extends ShapeUtil<AudioShape> {
  static override type = "audio-card" as const;
  containerRef?: HTMLElement;

  canResize = () => false;

  getDefaultProps(): AudioShape["props"] {
    return {
      src: "",
      fileName: "",
      fileSize: 0,
    };
  }

  getGeometry(shape: AudioShape) {
    return new Rectangle2d({
      width: 320,
      height: 72,
      isFilled: true,
    });
  }

  component(shape: AudioShape) {
    const audioRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const handler = () => {
        audioRef.current
          ?.closest(".tl-container")
          ?.querySelectorAll<HTMLMediaElement>("video,audio")
          .forEach((el) => {
            if (el !== audioRef.current) el.pause();
          });
      };
      audioRef.current?.addEventListener("play", handler);
    }, []);

    return (
      <HTMLContainer className="relative grid">
        <div
          ref={(el: HTMLDivElement) => (this.containerRef = el)}
          className="bg-zinc-900 relative p-1 flex flex-col"
        >
          <audio
            controls
            ref={audioRef}
            src={shape.props.src}
            className="object-contain flex-1 w-full pointer-events-auto overflow-hidden"
          />
          <div className="bg-zinc-800/80 text-white items-center py-1 px-2 flex gap-1 text-sm">
            <div className="truncate flex-1">{shape.props.fileName}</div>
            <div>{Format.bytes(shape.props.fileSize ?? 0)}</div>
          </div>
        </div>
      </HTMLContainer>
    );
  }

  indicator(shape: AudioShape) {
    return <rect />;
  }

  async toSvg() {
    if (!this.containerRef)
      return document.createElementNS("http://www.w3.org/2000/svg", "image");
    return await domtoimage.toPng(this.containerRef).then(function (dataUrl) {
      const image = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      );
      image.setAttributeNS("http://www.w3.org/1999/xlink", "href", dataUrl);
      return image;
    });
  }
}
