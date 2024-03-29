/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import {
  HTMLContainer,
  Rectangle2d,
  ShapeUtil,
  type TLBaseShape,
  type TLOnResizeHandler,
} from "@tldraw/tldraw";
import domtoimage from "dom-to-image";
import { useDrawContext } from "../../DrawContext";

type CardShape = TLBaseShape<
  "data-card",
  {
    w: number;
    h: number;
  } & KeyValue
>;

export class CardShapeUtil extends ShapeUtil<CardShape> {
  static override type = "data-card" as const;

  override onResize: TLOnResizeHandler<CardShape> = (shape, info) => {
    return {
      props: {
        w: Math.max(Math.min(info.initialBounds.w * info.scaleX, 1024), 128),
        h: Math.max(Math.min(info.initialBounds.h * info.scaleY, 768), 128),
      },
    };
  };

  getDefaultProps(): CardShape["props"] {
    return {
      w: 300,
      h: 200,
    };
  }

  getGeometry(shape: CardShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  component(shape: CardShape) {
    const { renderer } = useDrawContext();
    return (
      <HTMLContainer className="relative grid">
        <div className="relative grid" data-shape-id={shape.id}>
          {renderer?.(shape.props)}
        </div>
      </HTMLContainer>
    );
  }

  indicator(shape: CardShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }

  async toSvg(shape: CardShape) {
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
