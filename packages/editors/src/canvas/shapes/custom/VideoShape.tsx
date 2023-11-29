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
  type TLOnResizeHandler,
} from "@tldraw/tldraw";
import domtoimage from "dom-to-image";
import { useEffect, useRef } from "react";

type VideoShape = TLBaseShape<
  "video-card",
  {
    w: number;
    h: number;
    src: string;
    poster: string;
    fileName: string;
    fileSize: number;
  }
>;

export class VideoShapeUtil extends ShapeUtil<VideoShape> {
  static override type = "video-card" as const;
  containerRef?: HTMLElement;

  override onResize: TLOnResizeHandler<VideoShape> = (shape, info) => {
    return {
      props: {
        w: Math.max(Math.min(info.initialBounds.w * info.scaleX, 1024), 128),
        h: Math.max(Math.min(info.initialBounds.h * info.scaleY, 768), 128),
      },
    };
  };

  getDefaultProps(): VideoShape["props"] {
    return {
      src: "",
      poster: "",
      fileName: "",
      fileSize: 0,
      w: 400,
      h: 300,
    };
  }

  getGeometry(shape: VideoShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  component(shape: VideoShape) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const handler = () => {
        videoRef.current
          ?.closest(".tl-container")
          ?.querySelectorAll<HTMLMediaElement>("video,audio")
          .forEach((el) => {
            if (el !== videoRef.current) el.pause();
          });
      };
      videoRef.current?.addEventListener("play", handler);
    }, []);

    return (
      <HTMLContainer className="relative grid">
        <div
          data-shape-id={shape.id}
          className="bg-zinc-900 relative p-1 flex flex-col overflow-hidden"
        >
          <video
            controls
            ref={videoRef}
            src={shape.props.src}
            poster={shape.props.poster}
            className="object-contain flex-1 pointer-events-auto overflow-hidden"
          />
          <img
            src={shape.props.poster}
            className="object-contain flex-1 pointer-events-auto overflow-hidden hidden"
          />
          <div className="bg-zinc-800/80 text-white items-center py-1 px-2 flex gap-1 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={16}
              height={16}
            >
              <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
            </svg>
            <div className="truncate flex-1">{shape.props.fileName}</div>
            <div>{Format.bytes(shape.props.fileSize ?? 0)}</div>
          </div>
        </div>
      </HTMLContainer>
    );
  }

  indicator(shape: VideoShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }

  async toSvg(shape: VideoShape) {
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
