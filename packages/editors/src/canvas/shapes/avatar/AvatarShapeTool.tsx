/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { useIsDark } from "@axux/core";
import { StateNode } from "@tldraw/editor";
import {
  Rectangle2d,
  ShapeUtil,
  TLShapeUtilFlag,
  getDefaultColorTheme,
  useIsEditing,
} from "@tldraw/tldraw";
import { useEffect, useRef } from "react";
import { Idle } from "./IdleState";
import { Pointing } from "./PointingState";
import { AvatarShape } from "./type";

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

  override canEdit = () => true;
  override hideResizeHandles: TLShapeUtilFlag<AvatarShape> = () => true;
  override hideRotateHandle: TLShapeUtilFlag<AvatarShape> = () => true;

  override getDefaultProps(): AvatarShape["props"] {
    return {
      color: "black",
      fill: "none",
      dash: "draw",
      size: "s",
      font: "draw",
      text: "person",
      align: "center",
    } as AnyObject;
  }

  getGeometry(shape: AvatarShape) {
    const size = SIZE_MAP[shape.props.size as AnyObject];
    return new Rectangle2d({
      width: size,
      height: size,
      isFilled: true,
    });
  }

  indicator(shape: AvatarShape) {
    const size = SIZE_MAP[shape.props.size as AnyObject];
    return <rect width={size} height={size} />;
  }

  component(shape: AvatarShape) {
    const isDark = useIsDark();
    const inputRef = useRef<HTMLDivElement>(null);
    const isEditing = useIsEditing(shape.id);
    const size = SIZE_MAP[shape.props.size as AnyObject];
    const theme: KeyValue = getDefaultColorTheme({ isDarkMode: isDark });
    useEffect(() => {
      inputRef.current?.focus();
    }, [isEditing]);
    return (
      <>
        <svg id={shape.id} viewBox="0 0 30 30">
          <path
            width={size}
            height={size}
            fill="transparent"
            stroke={theme[shape.props.color as AnyObject]?.solid}
            d="M5 27.4996C5 20.2996 8.79988 17.0996 14.9999 17.0996C21.1999 17.0996 25.0001 20.2996 25 27.4996M14.9997 15.6001C18.4792 15.6001 21.2998 12.7794 21.2998 9.30003C21.2998 5.82062 18.4792 3 14.9997 3C11.5203 3 8.69971 5.82062 8.69971 9.30003C8.69971 12.7794 11.5203 15.6001 14.9997 15.6001Z"
          />
        </svg>
        <div
          ref={inputRef}
          id={shape.id}
          className="tl-text-label"
          data-font={shape.props.font}
          contentEditable={isEditing}
          style={{
            alignItems: "end",
            textAlign: "center",
            border: isEditing ? "2px solid currentColor" : "",
            // fontFamily: shape.props.font,
            fontSize: FONT_SIZE_MAP[shape.props.size as AnyObject],
            color: theme[shape.props.color as AnyObject].solid,
          }}
        >
          {shape.props.text as AnyObject}
        </div>
      </>
    );
  }
}
