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
    poster: string;
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
      poster: "",
      fileName: "",
      fileSize: 0,
    };
  }

  getGeometry(shape: AudioShape) {
    return new Rectangle2d({
      width: 320,
      height: 96,
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
          data-shape-id={shape.id}
          className="bg-zinc-900 relative p-1 flex flex-col overflow-hidden"
        >
          <audio
            controls
            ref={audioRef}
            src={shape.props.src}
            className="object-contain flex-1 w-full pointer-events-auto overflow-hidden"
          />
          <img
            src={shape.props.poster}
            className="object-fill flex-1 pointer-events-auto overflow-hidden hidden"
          />
          <div className="bg-zinc-800/80 text-white items-center py-1 px-2 flex gap-1 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={16}
              height={16}
            >
              <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
            </svg>
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

  async toSvg(shape: AudioShape) {
    const el = document.querySelector(`div[data-shape-id="${shape.id}"]`);
    if (!el)
      return document.createElementNS("http://www.w3.org/2000/svg", "image");
    (el.childNodes.item(0) as HTMLElement).style.display = "none";
    (el.childNodes.item(1) as HTMLElement).style.display = "block";
    return await domtoimage.toPng(el).then(function (dataUrl) {
      const image = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      );
      image.setAttributeNS("http://www.w3.org/1999/xlink", "href", dataUrl);
      (el.childNodes.item(0) as HTMLElement).style.display = "block";
      (el.childNodes.item(1) as HTMLElement).style.display = "none";
      return image;
    });
  }
}
