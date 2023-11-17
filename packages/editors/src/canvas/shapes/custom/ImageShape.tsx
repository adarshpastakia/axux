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

type ImageShape = TLBaseShape<
  "image-card",
  {
    w: number;
    h: number;
    src: string;
    fileName: string;
    fileSize: number;
  }
>;

export class ImageShapeUtil extends ShapeUtil<ImageShape> {
  static override type = "image-card" as const;
  containerRef?: HTMLElement;

  override onResize: TLOnResizeHandler<ImageShape> = (shape, info) => {
    return {
      props: {
        w: Math.max(Math.min(info.initialBounds.w * info.scaleX, 1024), 128),
        h: Math.max(Math.min(info.initialBounds.h * info.scaleY, 768), 128),
      },
    };
  };

  getDefaultProps(): ImageShape["props"] {
    return {
      src: "",
      fileName: "",
      fileSize: 0,
      w: 400,
      h: 300,
    };
  }

  getGeometry(shape: ImageShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  component(shape: ImageShape) {
    return (
      <HTMLContainer className="relative grid">
        <div
          ref={(el: HTMLDivElement) => (this.containerRef = el)}
          className="bg-zinc-900 relative p-1 flex flex-col"
        >
          <img
            src={shape.props.src}
            className="object-contain flex-1 pointer-events-none overflow-hidden"
          />
          <div className="bg-zinc-800/80 text-white items-center py-1 px-2 flex gap-1 text-sm">
            <div className="truncate flex-1">{shape.props.fileName}</div>
            <div>{Format.bytes(shape.props.fileSize ?? 0)}</div>
          </div>
        </div>
      </HTMLContainer>
    );
  }

  indicator(shape: ImageShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
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
