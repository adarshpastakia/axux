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
  TLBaseShape,
  TLOnResizeHandler,
} from "@tldraw/tldraw";

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
      <HTMLContainer className="bg-zinc-900 relative p-1 flex flex-col">
        <img
          src={shape.props.src}
          className="object-contain flex-1 pointer-events-none overflow-hidden"
        />
        <div className="bg-zinc-800/80 text-white items-center py-1 px-2 flex gap-1 text-sm">
          <div className="truncate flex-1">{shape.props.fileName}</div>
          <div>{Format.bytes(shape.props.fileSize ?? 0)}</div>
        </div>
      </HTMLContainer>
    );
  }

  indicator(shape: ImageShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}
