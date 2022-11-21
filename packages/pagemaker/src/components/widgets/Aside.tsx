// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import {
  AxAside,
  AxButton,
  AxContent,
  AxHeader,
  AxPanel,
  AxTitle,
} from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { usePageContext } from "../context";
import { Config } from "./Config";
import { WidgetList } from "./WidgetList";

export const Aside: FC = memo(() => {
  const { t } = useTranslation("pagemaker");
  const { selected, editConfig } = usePageContext();

  return (
    <AxAside width="18rem" align="end" className="page-maker__aside">
      <AxPanel.Group>
        {selected && (
          <AxPanel maxHeight="70%">
            <div className="ax-header">
              <AxTitle>{t("label.config")}</AxTitle>
              <AxButton
                rtlFlip
                variant="link"
                className="toggle-close"
                aria-label="close"
                stopPropagation
                icon={AppIcons.iconClose}
                onClick={() => editConfig(undefined)}
              />
            </div>
            <AxContent>
              <Config />
            </AxContent>
          </AxPanel>
        )}
        <AxPanel panelId="widgets">
          <AxHeader>
            <AxTitle>{t("label.widgets")}</AxTitle>
          </AxHeader>
          <WidgetList />
        </AxPanel>
      </AxPanel.Group>
    </AxAside>
  );
});
Aside.displayName = "AxPageMaker.Aside";
