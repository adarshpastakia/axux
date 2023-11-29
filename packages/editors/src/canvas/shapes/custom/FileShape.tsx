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

type FileShape = TLBaseShape<
  "file-card",
  {
    icon: string;
    fileType: string;
    fileName: string;
    fileSize: number;
  }
>;

export class FileShapeUtil extends ShapeUtil<FileShape> {
  static override type = "file-card" as const;
  containerRef?: HTMLElement;

  canResize = () => false;

  getDefaultProps(): FileShape["props"] {
    return {
      icon: "",
      fileType: "",
      fileName: "",
      fileSize: 0,
    };
  }

  getGeometry(shape: FileShape) {
    return new Rectangle2d({
      width: 320,
      height: 72,
      isFilled: true,
    });
  }

  component(shape: FileShape) {
    return (
      <HTMLContainer className="relative grid">
        <div data-shape-id={shape.id} className="relative p-1 flex border rounded m-1 overflow-hidden">
          <img
            src={shape.props.icon}
            className="object-contain pointer-events-none overflow-hidden w-12 h-12"
          />
          <div className="flex-1 overflow-hidden text-sm py-1 px-2">
            <div className="items-center flex gap-1">
              <div className="truncate flex-1">{shape.props.fileName}</div>
              <div>{Format.bytes(shape.props.fileSize ?? 0)}</div>
            </div>
            <div>{shape.props.fileType}</div>
          </div>
        </div>
      </HTMLContainer>
    );
  }

  indicator(shape: FileShape) {
    return <rect />;
  }

  async toSvg(shape: FileShape) {
    const el = document.querySelector(`div[data-shape-id="${shape.id}"]`);
    if (!el)
      return document.createElementNS("http://www.w3.org/2000/svg", "image");
    return await domtoimage.toPng(el).then(function (dataUrl) {
      const image = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      );
      image.setAttributeNS("http://www.w3.org/1999/xlink", "href", dataUrl);
      return image;
    });
  }
}
