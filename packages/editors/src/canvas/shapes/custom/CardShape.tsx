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
      w: 200,
      h: 100,
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
        {renderer?.(shape.props)}
      </HTMLContainer>
    );
  }

  indicator(shape: CardShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}
