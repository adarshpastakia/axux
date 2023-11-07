/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { AxAside, AxButton, AxFooter, AxSection, useIsDark } from "@axux/core";
import { getAssetUrls } from "@tldraw/assets/selfHosted";
import {
  Tldraw,
  type Editor,
  type StoreSnapshot,
  type TLRecord,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useEffect, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import {
  AvatarShapeTool,
  AvatarShapeUtil,
} from "./shapes/avatar/AvatarShapeTool";
import { AudioShapeUtil } from "./shapes/custom/AudioShape";
import { ImageShapeUtil } from "./shapes/custom/ImageShape";
import { VideoShapeUtil } from "./shapes/custom/VideoShape";

export interface DrawProps {
  assetsTitle?: string;
  snapshot?: StoreSnapshot<TLRecord>;
  assetsPath?: string;
  onUpdate?: (snapshot: StoreSnapshot<TLRecord>) => void;
}

export const AxDrawCanvas: FC<DrawProps> = ({
  assetsTitle,
  assetsPath = "/assets/@tldraw",
  snapshot,
}) => {
  const { t } = useTranslation("editors");
  const [editorRef, setEditor] = useState<Editor>();
  const isDark = useIsDark();

  useEffect(() => {
    editorRef?.user.updateUserPreferences({ isDarkMode: isDark });
  }, [editorRef, isDark]);

  useEffect(() => {
    snapshot && editorRef?.store.loadSnapshot(snapshot);
  }, [editorRef, snapshot]);

  const TLDraw = useMemo(
    () => (
      <Tldraw
        assetUrls={getAssetUrls({ baseUrl: assetsPath })}
        shapeUtils={[
          AvatarShapeUtil,
          AudioShapeUtil,
          ImageShapeUtil,
          VideoShapeUtil,
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
      >
        <AxFooter justify="end">
          <AxButton
            variant="solid"
            onClick={() =>
              console.log(
                JSON.stringify(editorRef?.store.getSnapshot(), null, 4)
              )
            }
          >
            {t("core:action.save")}
          </AxButton>
        </AxFooter>
      </AxAside>
    </AxSection>
  );
};
