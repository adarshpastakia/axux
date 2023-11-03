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
} from "@tldraw/tldraw";

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
    return (
      <HTMLContainer
        id={shape.id}
        className="bg-zinc-900 relative p-1 flex flex-col"
      >
        <audio
          controls
          src={shape.props.src}
          className="object-contain flex-1 w-full pointer-events-auto overflow-hidden"
        />
        <div className="bg-zinc-800/80 text-white items-center py-1 px-2 flex gap-1 text-sm">
          <div className="truncate flex-1">{shape.props.fileName}</div>
          <div>{Format.bytes(shape.props.fileSize ?? 0)}</div>
        </div>
      </HTMLContainer>
    );
  }

  indicator(shape: AudioShape) {
    return <rect />;
  }
}
