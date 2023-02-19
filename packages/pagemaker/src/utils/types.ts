/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ChildrenProp } from "@axux/core/dist/types";

export enum EnumTypes {
  PAGE = "page",
  GRID = "grid",
  BREAK = "break",
  DIVIDER = "divider",
  VDIVIDER = "vdivider",
  HEADING = "heading",
  IMAGE = "image",
  PARAGRAPH = "paragraph",
  TILE = "tile",
}

enum EnumAlign {
  CENTER = "center",
  START = "start",
  END = "end",
  JUSTIFY = "justify",
}

export type AspectType = "0" | "1 / 1" | "4 / 3" | "16 / 9";

export type SpanType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IItem {
  id: string;
  type: EnumTypes;
  colSpan?: SpanType;
  isLocked?: boolean;
  isReadOnly?: boolean;
}

export interface IHeadingConfig extends IItem {
  type: EnumTypes.HEADING;
  text: string;
  size?: number;
  color?: string;
  icon?: string;
  isLocked?: boolean;

  bold?: boolean;
  italic?: boolean;
  underline?: boolean;

  align?: EnumAlign;
}

export interface IParagraphConfig extends IItem {
  type: EnumTypes.PARAGRAPH;
  text: string;
  align?: EnumAlign;
}

export interface IImageConfig extends IItem {
  type: EnumTypes.IMAGE;
  src: string;
  aspect?: AspectType;
  fit?: "contain" | "cover" | "fit";
}

export interface IDividerConfig extends IItem {
  type: EnumTypes.DIVIDER;
  align?: EnumAlign;
  text?: string;
  size?: number;
  width?: number;
  color?: string;
  icon?: string;
  applyBg?: boolean;
}

export interface IVDividerConfig extends IItem {
  type: EnumTypes.VDIVIDER;
  width?: number;
  color?: string;
}

export interface IBreakConfig extends IItem {
  type: EnumTypes.BREAK;
}

export interface IGridConfig extends IItem {
  type: EnumTypes.GRID;
  children: PageItem[];
}

export interface ITileConfig extends IItem {
  type: EnumTypes.TILE;
  title?: string;
  info?: string;
  color?: string;
  icon?: string;
  bordered?: boolean;
  expandable?: boolean;
  aspect?: AspectType;
  widgetId: string;
}

export interface IWidgetObject {
  id: string;
  group?: string;
  icon?: string;
  title: string;
}

export interface IArtifactObject {
  id: string;
  icon?: string;
  title: string;
  config: Omit<IParagraphConfig, "id"> | Omit<IImageConfig, "id">;
}

export interface IDragObject {
  type: EnumTypes;
  item?: IItem;
  icon?: string;
  title?: string;
  config?: KeyValue;
  widgetId?: string;
}

export type PageItem =
  | IHeadingConfig
  | IDividerConfig
  | IVDividerConfig
  | IParagraphConfig
  | IImageConfig
  | IBreakConfig
  | IGridConfig
  | ITileConfig;

export type PageConfig = PageItem[];

export type WidgetObject = IWidgetObject;

export type ArtifactObject = IArtifactObject;

export interface IProps extends ChildrenProp {
  mode?: "screen" | "pdf";
  /**
   * Edit mode
   */
  isEditing?: boolean;
  /**
   * Page config
   */
  config: PageConfig;
  /**
   * Widget list
   */
  widgets: WidgetObject[];
  /**
   *
   */
  artifacts?: ArtifactObject[];

  pageRef?: React.RefObject<{ getRaw: () => Promise<string> } | undefined>;
  /**
   * Render widget tile
   * @param id
   */
  renderWidget: (widgetId: string) => JSX.Element;
  /**
   * Add new widget
   */
  onAdd?: (callback: (widget: WidgetObject) => void) => void;
  /**
   * Edit widget
   */
  onEdit?: (widgetId: string) => void;
  /**
   * Config changed
   */
  onChange?: (config: PageConfig) => void;
}
