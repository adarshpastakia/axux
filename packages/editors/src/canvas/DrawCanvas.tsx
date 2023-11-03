/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { AxAside, AxSection, useIsDark } from "@axux/core";
import { Editor, Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { FC, useEffect, useMemo, useState } from "react";
import { AudioShapeUtil } from "./shapes/AudioShape";
import { ImageShapeUtil } from "./shapes/ImageShape";
import { VideoShapeUtil } from "./shapes/VideoShape";

export interface DrawProps {
  assetsTitle?: string;
  shapes?: AnyObject[];
}

export const AxDrawCanvas: FC<DrawProps> = ({ assetsTitle, shapes = [] }) => {
  const [editorRef, setEditor] = useState<Editor>();
  const isDark = useIsDark();

  useEffect(() => {
    editorRef?.user.updateUserPreferences({ isDarkMode: isDark });
  }, [editorRef, isDark]);

  useEffect(() => {
    editorRef?.createShapes(shapes);
  }, [editorRef, shapes]);

  const TLDraw = useMemo(
    () => (
      <Tldraw
        shapeUtils={[AudioShapeUtil, ImageShapeUtil, VideoShapeUtil]}
        onMount={setEditor}
        overrides={{
          toolbar(editor, schema, helpers) {
            return schema.filter((t) => !["asset", "embed"].includes(t.id));
          },
          menu(editor, schema, helpers) {
            return schema.filter((t) => !["extras"].includes(t.id));
          },
          actions(editor, schema, helpers) {
            schema["insert-embed"].kbd = "";
            schema["insert-media"].kbd = "";
            return schema;
          },
        }}
      />
    ),
    []
  );

  return (
    <AxSection>
      <AxSection>
        <div className="absolute inset-0">{TLDraw}</div>
      </AxSection>
      <AxAside
        align="end"
        minWidth="20rem"
        title={assetsTitle ?? " "}
        isCollapsable
        isFlyout
      ></AxAside>
    </AxSection>
  );
};
