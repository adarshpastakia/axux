/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { AxSection, useIsDark } from "@axux/core";
import { debounce } from "@axux/utilities";
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
import { FileShapeUtil } from "./shapes/custom/FileShape";
import { ImageShapeUtil } from "./shapes/custom/ImageShape";
import { VideoShapeUtil } from "./shapes/custom/VideoShape";

export async function getSvgAsDataUrl(svg: SVGElement) {
  const clone = svg.cloneNode(true) as SVGGraphicsElement;
  clone.setAttribute("encoding", 'UTF-8"');

  const fileReader = new FileReader();
  const imgs = Array.from(clone.querySelectorAll("image"));

  for (const img of imgs) {
    const src = img.getAttribute("xlink:href");
    if (src) {
      if (!src.startsWith("data:")) {
        const blob = await (await fetch(src)).blob();
        const base64 = await new Promise<string>((resolve, reject) => {
          fileReader.onload = () => resolve(fileReader.result as string);
          fileReader.onerror = () => reject(fileReader.error);
          fileReader.readAsDataURL(blob);
        });
        img.setAttribute("xlink:href", base64);
      }
    }
  }

  const svgStr = new XMLSerializer().serializeToString(clone);
  // NOTE: `unescape` works everywhere although deprecated
  const base64SVG = window.btoa(unescape(encodeURIComponent(svgStr)));
  return `data:image/svg+xml;base64,${base64SVG}`;
}

export interface DrawProps {
  snapshot?: StoreSnapshot<TLRecord>;
  onUpdate?: (snapshot: StoreSnapshot<TLRecord>) => void;
  renderer?: (props: KeyValue) => AnyObject;
  canvasRef?: RefObject<{ exportPages: () => Promise<KeyValue[]> }>;
}

const TypeMap: KeyValue = {
  image: "image-card",
  video: "video-card",
  audio: "audio-card",
  file: "file-card",
  card: "data-card",
};

export const AxDrawCanvas: FC<DrawProps> = ({
  snapshot,
  renderer,
  onUpdate,
  canvasRef,
}) => {
  const [editorRef, setEditor] = useState<Editor>();
  const isDark = useIsDark();

  useEffect(() => {
    editorRef?.user.updateUserPreferences({ isDarkMode: isDark });
  }, [editorRef, isDark]);

  useEffect(() => {
    editorRef?.addListener(
      "update",
      debounce(() => onUpdate?.(editorRef.store.getSnapshot()), 500)
    );

    return () => {
      editorRef?.removeListener("update");
    };
  }, [editorRef]);

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

  useImperativeHandle(
    canvasRef,
    () => ({
      exportPages: async () => {
        const currentPage = editorRef?.currentPageId;
        const pages = Object.keys(
          editorRef?.store.getSnapshot().store ?? {}
        ).filter((key) => key.startsWith("page:"));
        const pageSnapshots: KeyValue[] = [];
        while (pages.length) {
          const pg: AnyObject = pages.shift();
          await new Promise((resolve) => {
            editorRef?.addListener("change", () => {
              if (editorRef.currentPageId === pg) {
                editorRef.removeListener("change");
                resolve(0);
              }
            });
            editorRef?.setCurrentPage(pg);
          });
          const shapes: AnyObject = editorRef?.currentPageShapeIds;
          const svg = await editorRef?.getSvg([...shapes], {
            scale: 1,
            background: true,
          });
          if (svg)
            pageSnapshots.push({
              id: pg,
              name: editorRef?.currentPage.name,
              content: { image: await getSvgAsDataUrl(svg) },
            });
        }
        currentPage && editorRef?.setCurrentPage(currentPage);
        return pageSnapshots;
      },
    }),
    [editorRef]
  );

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
          FileShapeUtil,
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
