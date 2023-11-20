/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { AxSection, useIsDark } from "@axux/core";
import { getAssetUrlsByMetaUrl } from "@tldraw/assets/urls";
import {
  Tldraw,
  type Editor,
  type StoreSnapshot,
  type TLRecord,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useState,
  type DragEvent,
  type FC,
  type RefObject,
} from "react";
import { DrawContextProvider } from "./DrawContext";
import {
  AvatarShapeTool,
  AvatarShapeUtil,
} from "./shapes/avatar/AvatarShapeTool";
import { AudioShapeUtil } from "./shapes/custom/AudioShape";
import { CardShapeUtil } from "./shapes/custom/CardShape";
import { ImageShapeUtil } from "./shapes/custom/ImageShape";
import { VideoShapeUtil } from "./shapes/custom/VideoShape";

export interface DrawProps {
  snapshot?: StoreSnapshot<TLRecord>;
  onUpdate?: (snapshot: StoreSnapshot<TLRecord>) => void;
  renderer?: (props: KeyValue) => AnyObject;
  canvasRef?: RefObject<{ exportPages: () => KeyValue<string> }>;
}

const TypeMap: KeyValue = {
  image: "image-card",
  video: "video-card",
  audio: "audio-card",
  card: "data-card",
};

export const AxDrawCanvas: FC<DrawProps> = ({
  snapshot,
  renderer,
  canvasRef,
}) => {
  const [editorRef, setEditor] = useState<Editor>();
  const isDark = useIsDark();

  useEffect(() => {
    editorRef?.user.updateUserPreferences({ isDarkMode: isDark });
  }, [editorRef, isDark]);

  useLayoutEffect(() => {
    setTimeout(() => {
      snapshot && editorRef?.store.loadSnapshot(snapshot);
    }, 500);
  }, [editorRef, snapshot]);

  const handleDragOver = useCallback((e: DragEvent) => {
    if (!e.dataTransfer.getData("axux/canvas")) {
      e.preventDefault();
      return false;
    }
    return true;
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      const data = e.dataTransfer.getData("axux/canvas");
      if (!data) {
        e.preventDefault();
        return false;
      }
      const { type, ...props } = JSON.parse(data);
      if (type in TypeMap) {
        const { x = 0, y = 0 } =
          editorRef?.getContainer().getBoundingClientRect() ?? {};
        editorRef?.createShape({
          type: TypeMap[type],
          x: e.clientX - x,
          y: e.clientY - y,
          props,
        });
      }
      return true;
    },
    [editorRef]
  );

  useImperativeHandle(canvasRef, () => ({
    exportPages() {
      return {};
    },
  }));

  const TLDraw = useMemo(
    () => (
      <Tldraw
        assetUrls={getAssetUrlsByMetaUrl()}
        shapeUtils={[
          AvatarShapeUtil,
          AudioShapeUtil,
          ImageShapeUtil,
          VideoShapeUtil,
          CardShapeUtil,
        ]}
        tools={[AvatarShapeTool]}
        onMount={setEditor}
        overrides={{
          toolbar(editor, schema, helpers) {
            schema.push({
              id: "avatar",
              type: "item",
              readonlyOk: true,
              toolItem: {
                id: "avatar",
                label: "tool.avatar" as AnyObject,
                readonlyOk: false,
                icon: "avatar",
                onSelect() {
                  editor.setCurrentTool("avatar");
                },
              },
            });
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
    <DrawContextProvider renderer={renderer}>
      <AxSection>
        <div
          className="absolute inset-0"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {TLDraw}
        </div>
      </AxSection>
    </DrawContextProvider>
  );
};
