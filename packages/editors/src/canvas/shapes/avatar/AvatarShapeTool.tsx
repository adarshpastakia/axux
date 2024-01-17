/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { useIsDark } from "@axux/core";
import { handleEnter } from "@axux/utilities/dist/handlers";
import { StateNode } from "@tldraw/editor";
import {
  Rectangle2d,
  ShapeUtil,
  getDefaultColorTheme,
  useIsEditing,
  type Editor,
  type TLShapeUtilFlag,
} from "@tldraw/tldraw";
import domtoimage from "dom-to-image";
import { useEffect, useRef } from "react";
import { Idle } from "./IdleState";
import { Pointing } from "./PointingState";
import { AvatarShapeProps, type AvatarShape } from "./type";

/** @public */
export class AvatarShapeTool extends StateNode {
  static override id = "avatar";
  static override initial = "idle";
  static override children = () => [Idle, Pointing];

  override shapeType = "avatar";
}

const SIZE_MAP: KeyValue = {
  s: 48,
  m: 72,
  l: 96,
  xl: 128,
};

const FONT_SIZE_MAP: KeyValue = {
  s: 12,
  m: 16,
  l: 18,
  xl: 22,
};

export class AvatarShapeUtil extends ShapeUtil<AvatarShape> {
  static override type = "avatar" as const;
  static override props = AvatarShapeProps;

  el = document.createElement("div");

  override canEdit = () => true;
  override hideResizeHandles: TLShapeUtilFlag<AvatarShape> = () => true;
  override hideRotateHandle: TLShapeUtilFlag<AvatarShape> = () => true;

  override getDefaultProps(): AvatarShape["props"] {
    return {
      color: "black",
      fill: "none",
      size: "s",
      font: "draw",
      text: "person",
    } as AnyObject;
  }

  constructor(editor: Editor) {
    super(editor);
    this.el.style.position = "absolute";
    editor.getContainer().appendChild(this.el);
  }

  getSize(shape: AvatarShape) {
    const size = SIZE_MAP[shape.props.size as AnyObject];
    this.el.innerHTML = `<div class="tl-text-label" data-font="${
      shape.props.font
    }" style="position:relative;align-items:end;font-size:${
      FONT_SIZE_MAP[shape.props.size as AnyObject] as string
    }px;">
<div class="tl-text-label__inner">
  <div class="tl-text tl-text-content" style="white-space:nowrap;padding:4px;">
      ${shape.props.text}
    </div></div></div>`;

    return {
      width: Math.max(size, this.el.offsetWidth),
      height: +size + this.el.offsetHeight,
    };
  }

  getGeometry(shape: AvatarShape) {
    const { width, height } = this.getSize(shape);
    return new Rectangle2d({
      width,
      height,
      isFilled: true,
    });
  }

  indicator(shape: AvatarShape) {
    const { width, height } = this.getSize(shape);
    return <rect width={width} height={height} />;
  }

  onChange = (shape: AvatarShape, newText: string) => {
    const {
      id,
      type,
      props: { text },
    } = shape as AnyObject;

    if (newText && text.trim() !== newText.trim()) {
      this.editor.updateShapes([
        {
          id,
          type,
          props: {
            text: newText.trim(),
          },
        },
      ]);
    }
  };

  component(shape: AvatarShape) {
    const isDark = useIsDark();
    const isEditing = useIsEditing(shape.id);
    const size = SIZE_MAP[shape.props.size as AnyObject];
    const theme: KeyValue = getDefaultColorTheme({ isDarkMode: isDark });
    const inputRef = useRef("");
    const { width, height } = this.getSize(shape);
    useEffect(() => {
      !isEditing && inputRef.current && this.onChange(shape, inputRef.current);
    }, [isEditing]);
    let bg = "transparent";
    if (
      (shape.props.fill as AnyObject) === "solid" ||
      (shape.props.fill as AnyObject) === "pattern"
    )
      bg = theme[shape.props.color as AnyObject]?.semi;
    if ((shape.props.fill as AnyObject) === "semi")
      bg = isDark ? "#28292e" : "#fcfffe";
    return (
      <div
        data-shape-id={shape.id}
        style={{ position: "relative", textAlign: "center", width, height }}
      >
        <svg
          id={"svg-" + shape.id}
          viewBox="0 0 30 30"
          width={size}
          height={size}
        >
          <path
            fill={bg}
            stroke={theme[shape.props.color as AnyObject]?.solid}
            d="M5 27.4996C5 20.2996 8.79988 17.0996 14.9999 17.0996C21.1999 17.0996 25.0001 20.2996 25 27.4996M14.9997 15.6001C18.4792 15.6001 21.2998 12.7794 21.2998 9.30003C21.2998 5.82062 18.4792 3 14.9997 3C11.5203 3 8.69971 5.82062 8.69971 9.30003C8.69971 12.7794 11.5203 15.6001 14.9997 15.6001Z"
          />
        </svg>
        <div
          id={"label-" + shape.id}
          className="tl-text-label"
          data-isediting={isEditing}
          data-font={shape.props.font}
          style={{
            alignItems: "end",
            fontSize: FONT_SIZE_MAP[shape.props.size as AnyObject],
            color: theme[shape.props.color as AnyObject].solid,
          }}
        >
          <div className="tl-text-label__inner" style={{ minWidth: "100%" }}>
            <div
              className="tl-text tl-text-content"
              style={{ whiteSpace: "nowrap", padding: 4 }}
            >
              {`${shape.props.text}`}
            </div>
            {isEditing && (
              <textarea
                className="tl-text tl-text-input"
                style={{ whiteSpace: "nowrap", padding: 4, minWidth: "100%" }}
                name="text"
                tabIndex={-1}
                autoComplete="false"
                autoCapitalize="false"
                autoCorrect="false"
                autoSave="false"
                placeholder=""
                spellCheck="true"
                wrap="off"
                dir="auto"
                ref={(el) => (el?.select(), el?.focus())}
                onKeyDown={handleEnter(
                  () => (
                    this.onChange(shape, inputRef.current),
                    this.editor.setEditingShape(null)
                  ),
                  true
                )}
                onChange={(e) => (inputRef.current = e.target.value)}
                defaultValue={shape.props.text as AnyObject}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  async toSvg(shape: AvatarShape) {
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
