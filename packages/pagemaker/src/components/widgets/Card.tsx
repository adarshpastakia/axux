// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { ChildrenProp } from "@axux/core/dist/types";
import { FC, memo } from "react";
import { EnumTypes } from "../../utils/types";
import { usePageContext } from "../context";

export const Card: FC<
  {
    type: EnumTypes;
    widgetId?: string;
    title?: string;
  } & ChildrenProp
> = memo(({ children, type, widgetId, title }) => {
  const { setDragging } = usePageContext();
  return (
    <div
      className="page-maker__widgetList--card"
      draggable
      onDragStart={() => setDragging({ type, title, widgetId })}
    >
      {children}
    </div>
  );
});
Card.displayName = "AxPageMaker.Card";
