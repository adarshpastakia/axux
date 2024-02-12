/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { ActionBrush } from "./components/ActionBrush";
import { ActionClear } from "./components/ActionClear";
import { ActionDelete } from "./components/ActionDelete";
import { ActionExpand } from "./components/ActionExpand";
import { ActionGroup } from "./components/ActionGroup";
import { ActionLayout } from "./components/ActionLayout";
import { ActionZoom } from "./components/ActionZoom";
import { Canvas } from "./components/Canvas";
import { Toolbar } from "./components/Toolbar";
import { GraphProvider } from "./context/GraphContext";
import { type GraphProps } from "./types";

export const AxGraph: FC<GraphProps> & {
  Toolbar: typeof Toolbar;
  Canvas: typeof Canvas;
  ActionGroup: typeof ActionGroup;
  ActionBrush: typeof ActionBrush;
  ActionClear: typeof ActionClear;
  ActionDelete: typeof ActionDelete;
  ActionExpand: typeof ActionExpand;
  ActionLayout: typeof ActionLayout;
  ActionZoom: typeof ActionZoom;
} = (props) => {
  return <GraphProvider {...props} />;
};

AxGraph.Toolbar = Toolbar;
AxGraph.Canvas = Canvas;
AxGraph.ActionGroup = ActionGroup;
AxGraph.ActionBrush = ActionBrush;
AxGraph.ActionClear = ActionClear;
AxGraph.ActionDelete = ActionDelete;
AxGraph.ActionExpand = ActionExpand;
AxGraph.ActionLayout = ActionLayout;
AxGraph.ActionZoom = ActionZoom;
