/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { Fragment, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGraphInternal } from "../context/GraphContext";
import { GraphIcons } from "../types/icons";

type Mode = "brush" | "lasso" | undefined;

export const ActionBrush = () => {
  const { t } = useTranslation("graph");
  const { changeMode, graph } = useGraphInternal();

  const [enabled, setEnabled] = useState<Mode>();

  const enableBrush = useCallback(
    (mode: Mode) => {
      changeMode(mode);
      setEnabled(mode as AnyObject);
    },
    [changeMode]
  );

  return (
    <Fragment>
      {enabled && (
        <AxButton.Group variant="flat" className="m-0 fixed z-10 bg-base">
          <AxButton
            className="flush m-0"
            variant={enabled === "lasso" ? "solid" : "link"}
            icon={GraphIcons.selectLasso}
            // isDisabled={enabled === "lasso"}
            onClick={() => enableBrush("lasso")}
            tooltip={{ content: t("action.lassoSelect"), placement: "bottom" }}
          />
          <AxButton
            className="flush m-0"
            variant={enabled === "brush" ? "solid" : "link"}
            icon={GraphIcons.selectRect}
            // isDisabled={enabled === "brush"}
            onClick={() => enableBrush("brush")}
            tooltip={{ content: t("action.brushSelect"), placement: "bottom" }}
          />
          <AxButton
            variant="link"
            className="flush"
            onClick={() => enableBrush(undefined)}
          >
            {t("action.cancel")}
          </AxButton>
        </AxButton.Group>
      )}
      <AxButton
        icon={GraphIcons.selectLasso}
        isDisabled={graph.isClear}
        onClick={() => enableBrush("lasso")}
        tooltip={{ content: t("action.startSelect"), placement: "right" }}
      />
    </Fragment>
  );
};
