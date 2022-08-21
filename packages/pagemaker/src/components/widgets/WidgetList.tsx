// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxIcon } from "@axux/core";
import { AxField } from "@axux/form";
import { FC, memo, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EnumTypes } from "../..";
import { matchString } from "../../../../utilities/dist";
import { iconColumn, iconDivider, iconRow, iconText } from "../../utils/icons";
import { IWidgetObject } from "../../utils/types";
import { usePageContext } from "../context";
import { Card } from "./Card";

export const WidgetList: FC = memo(() => {
  const { t } = useTranslation("pagemaker");
  const { widgets } = usePageContext();

  const [search, setSearch] = useState("");
  const [list, setList] = useState<IWidgetObject[]>([]);

  useEffect(() => {
    if (widgets.length) {
      setList(
        widgets.sort((a, b) =>
          a.title.toUpperCase().localeCompare(b.title.toUpperCase())
        )
      );
    }
  }, [widgets]);

  useLayoutEffect(() => {
    if (widgets.length) {
      const newList = widgets.sort((a, b) =>
        a.title.toUpperCase().localeCompare(b.title.toUpperCase())
      );

      if (search) {
        setList(newList.filter((w) => matchString(w.title, search)));
      } else {
        setList(newList);
      }
    }
  }, [search, widgets]);

  return (
    <div className="page-maker__widgetList">
      <AxField.Search onSearch={(e) => setSearch(e ?? "")} />
      <div className="page-maker__widgetList--grid">
        <Card type={EnumTypes.ROW}>
          <AxIcon icon={iconRow} />
          <div>{t("label.row")}</div>
        </Card>
        <Card type={EnumTypes.COL}>
          <AxIcon icon={iconColumn} />
          <div>{t("label.col")}</div>
        </Card>
        <Card type={EnumTypes.HEADING}>
          <AxIcon icon={iconText} />
          <div>{t("label.heading")}</div>
        </Card>
        <Card type={EnumTypes.DIVIDER}>
          <AxIcon icon={iconDivider} />
          <div>{t("label.divider")}</div>
        </Card>
      </div>
      <div className="page-maker__widgetList--grid">
        {list.length === 0 && (
          <span style={{ gridColumnEnd: "span 2" }}>
            {t("label.noWidgets")}
          </span>
        )}
        {list.map((widget) => (
          <Card
            key={widget.id}
            type={EnumTypes.TILE}
            widgetId={widget.id}
            title={widget.title}
          >
            <AxIcon icon={widget.icon ?? ""} />
            <div>{widget.title}</div>
          </Card>
        ))}
      </div>
    </div>
  );
});
WidgetList.displayName = "AxPageMaker.WidgetList";
